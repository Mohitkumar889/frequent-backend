const UserService = require("../services/UserService");
const helpers = require("../util/helpers");
var ObjectId = require("mongoose").Types.ObjectId;

module.exports = () => {
  const registerUser = async (req, res, next) => {
    console.log("UserController => registerUser");
    const currentDate = new Date();
    const birthDate = new Date(req.body.dateOfBirth);
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    req.body.age = age;
    console.log(req.body, "registerData");
    let User = await UserService().addUser(req.body);

    req.rData = User;
    req.msg = "Success";
    next();
  };

  const userList = async (req, res, next) => {
    console.log("UserController => userList");
    let { page, limit } = req.query;
    let query = {};

    let userList = await UserService().getUserList(query, page, limit);

    req.msg = "success";
    req.rData = {
      page,
      limit,
      userList,
    };
    next();
  };

  const getCountry = async (req, res, next) => {
    console.log("UserController => getCountry");
    let { page, limit } = req.query;
    let query = {};
    page = page ? parseInt(page) : "";
    limit = limit ? parseInt(limit) : "";

    let coutries = await UserService().getCountryList(query, page, limit);

    req.msg = "success";
    req.rData = {
      page,
      limit,
      coutries,
    };
    next();
  };

  const getState = async (req, res, next) => {
    console.log("UserController => getCountry");
    let { page, limit } = req.query;
    let cId = req.params.id;
    console.log(cId, "countryId");
    let query = {
      country: new ObjectId(cId),
    };
    page = page ? parseInt(page) : "";
    limit = limit ? parseInt(limit) : "";

    let states = await UserService().getStateList(query, page, limit);

    req.msg = "success";
    req.rData = {
      page,
      limit,
      states,
    };
    next();
  };

  const getCity = async (req, res, next) => {
    console.log("UserController => getCity");
    let { page, limit } = req.query;
    let sId = req.params.id;
    console.log(sId, "stateId");
    let query = {
      state: new ObjectId(sId),
    };
    page = page ? parseInt(page) : "";
    limit = limit ? parseInt(limit) : "";

    let cities = await UserService().getCityList(query, page, limit);

    req.msg = "success";
    req.rData = {
      page,
      limit,
      cities,
    };
    next();
  };
  const getUsers = async (req, res, next) => {};

  return {
    registerUser,
    getCountry,
    getState,
    getCity,
    getUsers,
    userList,
  };
};
