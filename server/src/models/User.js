const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String,
  displayName: String,
  email: String,
  imageURL: String,
  credits: { type: Number, default: 0 },
});

mongoose.model("users", userSchema);
