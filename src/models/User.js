const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    country: {
      type: Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },
    state: {
      type: Schema.Types.ObjectId,
      ref: "State",
      required: true,
    },
    city: {
      type: Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
    gender: {
      type: String,
      enum: ["1", "2"], //1 for male , 2 for female
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true, // Assuming dateOfBirth is required
    },
    age: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

var User = mongoose.model("User", UserSchema);

module.exports = User;
