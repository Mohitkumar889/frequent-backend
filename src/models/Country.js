const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const CountrySchema = new Schema({
  sortname: {
    type: String,
  },
  name: {
    type: String,
  },
});

var Country = mongoose.model("Country", CountrySchema);

module.exports = Country;
