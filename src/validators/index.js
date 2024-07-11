const validator = require("node-input-validator");
const ResponseMiddleware = require("../middlewares/ResponseMiddleware.js");
const helpers = require("../util/helpers.js");
const { models } = require("../models");
var ObjectId = require("mongoose").Types.ObjectId;

/**
 * to check given id exists in given table
 * additional column checks can be passed in pairs
 * e.g exists:table_name,primary_id,col1,value1,col2,value2 and so on
 * col-value must be in pairs
 */
validator.extend("exists", async function ({ value, args }) {
  console.log("ValidatorsIndex => exists");
  console.log(value);
  console.log(args);
  let result = await models[args[0]].find({
    [args[1]]: new ObjectId(value),
  });

  return result.length > 0 ? true : false;
});

validator.extend("ageRange", async ({ value }) => {
  const currentDate = new Date();
  const birthDate = new Date(value);
  console.log(birthDate, "birthDate");

  if (isNaN(birthDate)) {
    return false;
  }

  const age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = currentDate.getMonth() - birthDate.getMonth();
  const dayDiff = currentDate.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age >= 14 && age <= 99;
});

validator.extendMessages(
  {
    required: "The :attribute field must not be empty.",
    email: "E-mail must be a valid email address.",
    exists: "The :attribute is not found!",
  },
  "en"
);

module.exports = {
  //common function to send validation response
  validate: (v, res, next, req = null) => {
    console.log("ValidatorsIndex => validate");

    if (
      v.check().then(function (matched) {
        if (!matched) {
          req.rCode = 0;
          let message = helpers().getErrorMessage(v.errors);

          ResponseMiddleware(req, res, next, message);
        } else {
          next();
        }
      })
    );
  },

  validations: {
    general: {
      requiredString: "required|alpha",
      nullableString: "nullable|alpha",
      requiredEmail: "required|email",
    },
  },
};
