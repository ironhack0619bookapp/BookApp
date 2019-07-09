const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  username: String,
  password: String,
  email: String,
  phone: String,
  location: { 
    type: {
        type: String
    },
    coordinates: [Number]
  },
  imgName: String,
  imgPath: String,
  type: {
    type: String,
    enum: ["admin", "user"],
    default: 'user'
  },
  token: String,
  status: {
    type: String,
    enum: ['Pending Confirmation','Active'],
    default: 'Pending Confirmation'
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
