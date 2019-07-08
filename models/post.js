const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  //Populate books data ie: title, author, description, image, price.

  //Populate user data ie: name, email, phone number, location
  price: Number,
  description: String,
  type: {
    type: String, enum: ["intercambio", "venta"]
  }
});

const Post= mongoose.model("Post", postSchema);

module.exports = Post;
