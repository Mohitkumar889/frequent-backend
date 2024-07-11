const User = require("../models/User");
const Country = require("../models/Country");
const State = require("../models/State");
const City = require("../models/City");
var ObjectId = require("mongoose").Types.ObjectId;

module.exports = () => {
  const addUser = (data) => {
    console.log("UserService=>addUser");
    return new Promise(function (resolve, reject) {
      User.create(data).then(resolve).catch(reject);
    });
  };

  const getCountryList = (query, page, limit) => {
    console.log("UserService => getCountryList");
    if (page) {
      page -= 1;
    }
    return new Promise(function (resolve, reject) {
      let pipeline = [];
      pipeline.push({ $match: query });
      if (limit && page) {
        pipeline.push({ $skip: page * limit }, { $limit: limit });
      }
      let orm = Country.aggregate(pipeline);

      orm.then(resolve).catch(reject);
    });
  };

  const getStateList = (query, page, limit) => {
    console.log("UserService => getStateList");
    if (page) {
      page -= 1;
    }
    return new Promise(function (resolve, reject) {
      let pipeline = [];
      pipeline.push({ $match: query });
      if (limit && page) {
        pipeline.push({ $skip: page * limit }, { $limit: limit });
      }
      let orm = State.aggregate(pipeline);

      orm.then(resolve).catch(reject);
    });
  };

  const getCityList = (query, page, limit) => {
    console.log("UserService => getCityList");
    if (page) {
      page -= 1;
    }
    return new Promise(function (resolve, reject) {
      let pipeline = [];
      pipeline.push({ $match: query });
      if (limit && page) {
        pipeline.push({ $skip: page * limit }, { $limit: limit });
      }
      let orm = City.aggregate(pipeline);

      orm.then(resolve).catch(reject);
    });
  };

  const getUserList = (query, page, limit) => {
    console.log("UserService => getUserList");
    if (page) {
      page -= 1;
    }
    return new Promise(function (resolve, reject) {
      let pipeline = [
        {
          $match: query,
        },
        {
          $lookup: {
            from: "countries",
            localField: "country",
            foreignField: "_id",
            as: "countryDetail",
            pipeline: [
              {
                $project: {
                  _id: 1,
                  name: 1,
                },
              },
            ],
          },
        },
        {
          $unwind: "$countryDetail",
        },
        {
          $lookup: {
            from: "states",
            localField: "state",
            foreignField: "_id",
            as: "stateDetail",
            pipeline: [
              {
                $project: {
                  _id: 1,
                  name: 1,
                },
              },
            ],
          },
        },
        {
          $unwind: "$stateDetail",
        },
        {
          $lookup: {
            from: "cities",
            localField: "city",
            foreignField: "_id",
            as: "cityDetail",
            pipeline: [
              {
                $project: {
                  _id: 1,
                  name: 1,
                },
              },
            ],
          },
        },
        {
          $unwind: "$cityDetail",
        },
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            email: 1,
            email: 1,
            country: 1,
            state: 1,
            city: 1,
            gender: 1,
            dateOfBirth: 1,
            age: 1,
            countryDetail: 1,
            stateDetail: 1,
            cityDetail: 1,
          },
        },
      ];
      if (limit) {
        pipeline.push({ $skip: page * limit }, { $limit: limit });
      }
      let orm = User.aggregate(pipeline);

      orm.then(resolve).catch(reject);
    });
  };

  return {
    addUser,
    getCountryList,
    getStateList,
    getCityList,
    getUserList,
  };
};
