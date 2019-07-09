const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  //Populate books data ie: title, author, description, image, price.

  //Populate  data ie: name, email, phone number, location
  price: Number,
  description: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  type: {
    type: String, enum: ["intercambio", "venta"]
  }
});

const Post= mongoose.model("Post", postSchema);

module.exports = Post;
