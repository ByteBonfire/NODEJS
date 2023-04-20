import config from "../../config/config";
import mongoose from "mongoose";
const crypto = require("crypto");

const authUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
  },
});
const salt = config.Salt;

authUserSchema.pre("save", async function (next) {
  const user = this;

  //   console.log(user);
  if (!user.isModified("password")) return next();

  //   const salt = crypto.randomBytes(16).toString("hex");

  console.log(salt);

  const hash = crypto
    .pbkdf2Sync(user.password, salt, 1000, 64, `sha512`)
    .toString(`hex`);

  user.password = hash;
  next();
});

export default mongoose.model("authUser", authUserSchema);
