const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema({
  id: { type: ObjectId },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date },
  address: { type: String },
  privateKey: { type: String },
});

const user = mongoose.model("User", userSchema);

module.exports = user;
