const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const CitySchema = new Schema({
  name: {
    type: String,
  },
  state: {
    type: Schema.Types.ObjectId,
    ref: "State",
    default: null,
  },
});

var City = mongoose.model("City", CitySchema);

module.exports = City;
