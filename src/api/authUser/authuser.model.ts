import { CURSOR_FLAGS } from "mongodb";
import mongoose from "mongoose";
const crypto = require("crypto");

const dotenv = require("dotenv");
// const fs = require("fs");
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

authUserSchema.pre("save", async function (next) {
  const user = this;

  //   console.log(user);
  if (!user.isModified("password")) return next();

  //   const salt = crypto.randomBytes(16).toString("hex");

  // Load environment variables from .env file
  dotenv.config();
  const salt = process.env.SALT_VALUE;
  console.log(process.env.SALT_VALUE);

  if (!salt) {
    throw new Error("Failed to fetch salt for password hashing");
  }
  const hash = crypto
    .pbkdf2Sync(user.password, salt, 1000, 64, `sha512`)
    .toString(`hex`);

  //   // Set SALT variable to the generated salt
  //   process.env.SALT = salt;

  //   // Update .env file with new value for SALT
  //   fs.writeFileSync(".env", "SALT=" + salt);

  user.password = hash;
  next();
});

export default mongoose.model("authUser", authUserSchema);
