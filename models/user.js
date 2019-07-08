const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  username: String,
  password: String,
  email: String,
  phone: Number,
  lng: Number,
  lat: Number,
  image: String,
  type: {
    type: String, enum: ["admin", "user"]
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
