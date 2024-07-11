const UserValidator = require("../validators/UserValidator");
const ErrorHandlerMiddleware = require("../middlewares/ErrorHandlerMiddleware");
const ResponseMiddleware = require("../middlewares/ResponseMiddleware");
const UserController = require("../controllers/UserController");

const router = require("express").Router();

router.get(
  "/getCountry",
  ErrorHandlerMiddleware(UserController().getCountry),
  ResponseMiddleware
);

router.get(
  "/getState/:id",
  ErrorHandlerMiddleware(UserController().getState),
  ResponseMiddleware
);

router.get(
  "/getCity/:id",
  ErrorHandlerMiddleware(UserController().getCity),
  ResponseMiddleware
);

router.post(
  "/registerUser",
  UserValidator().vaildateUserRegister,
  ErrorHandlerMiddleware(UserController().registerUser),
  ResponseMiddleware
);

router.get(
  "/userList",
  ErrorHandlerMiddleware(UserController().userList),
  ResponseMiddleware
);

module.exports = router;
