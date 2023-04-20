const mongoose = require("mongoose");

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  age: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
});

export default mongoose.model("User", userSchema);
