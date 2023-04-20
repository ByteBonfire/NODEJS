const dotenv = require("dotenv");
dotenv.config();
export default {
  Salt: process.env.SALT_VALUE,
};
