const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String,
  displayName: String,
  email: String,
  imageURL: String,
});

mongoose.model("users", userSchema);
