const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const StateSchema = new Schema({
  name: {
    type: String,
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: "Country",
  },
});

var State = mongoose.model("State", StateSchema);

module.exports = State;
