require("dotenv").config();
const mongoose = require("mongoose");
const Country = require("./src/models/Country");
const State = require("./src/models/State");
const City = require("./src/models/City");

const countriesData = require("./src/data/countries.js");
console.log(countriesData);
const statesData = require("./src/data/states.js");
const citiesData = require("./src/data/cities.js");

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.mongodbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connected");

    const countryCount = await Country.countDocuments();
    console.log(countryCount, "countryCount");
    const stateCount = await State.countDocuments();
    console.log(stateCount, "stateCount");

    const cityCount = await City.countDocuments();
    console.log(cityCount, "cityCount");

    if (countryCount === 0) {
      await Country.insertMany(countriesData);
      console.log("Countries seeded");
    }

    if (stateCount === 0) {
      const statesWithCountryRefs = await Promise.all(
        statesData.map(async (state) => {
          const country = countriesData.find(
            (country) => country.id === state.country_id
          );

          console.log(country);
          if (country) {
            let countryDe = await Country.findOne({ name: country.name })
              .lean()
              .exec();

            console.log(countryDe, countryDe._id, "countryDe");
            if (countryDe) {
              return {
                _id: new mongoose.Types.ObjectId(),
                name: state.name,
                country: countryDe._id,
              };
            } else {
              return {
                _id: new mongoose.Types.ObjectId(),
                name: state.name,
                country: "",
              };
            }
          }
        })
      );
      console.log(statesWithCountryRefs);
      await State.insertMany(statesWithCountryRefs);
      console.log("States seeded");
    }

    if (cityCount === 0) {
      const citiesWithStateRefs = await Promise.all(
        citiesData.map(async (city) => {
          const state = statesData.find((state) => state.id == city.state_id);
          if (state) {
            let stateDe = await State.findOne({ name: state.name })
              .lean()
              .exec();

            console.log(stateDe?._id, "stateDe");
            if (stateDe) {
              return {
                _id: new mongoose.Types.ObjectId(),
                name: city.name,
                state: stateDe?._id ?? null,
              };
            } else {
              return {
                _id: new mongoose.Types.ObjectId(),
                name: city.name,
                state: null,
              };
            }
          }
        })
      );
      console.log(citiesWithStateRefs, "citiesWithStateRefs");
      await City.insertMany(citiesWithStateRefs);
      console.log("Cities seeded");
    }

    console.log("Seeding completed");

    console.log("Database seeded successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

seedDatabase();
