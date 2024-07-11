const { Validator } = require("node-input-validator");
const { validate, validations } = require("./index");

module.exports = () => {
  const vaildateUserRegister = async (req, res, next) => {
    let v = {};
    console.log(req.body, "sddhhdj");
    v = new Validator(req.body, {
      firstName: validations.general.requiredString,
      lastName: validations.general.requiredString,
      email: validations.general.requiredEmail,
      country: "required|string|exists:Country,_id",
      state: "required|string|exists:State,_id",
      city: "required|string|exists:City,_id",
      gender: "required",
      dateOfBirth: "required|date|ageRange",
      // age: "required",
    });

    validate(v, res, next, req);
  };

  return {
    vaildateUserRegister,
  };
};
