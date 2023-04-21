const dotenv = require("dotenv");
dotenv.config();
// export default {
//   Salt: process.env.SALT_VALUE,
// };

export default () => {
  const envVars = {
    salt_value: process.env.SALT_VALUE,
    signature_value: process.env.SIGNATURE_VALUE,
  };
  return envVars;
};
