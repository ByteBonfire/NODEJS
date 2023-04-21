"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
// export default {
//   Salt: process.env.SALT_VALUE,
// };
exports.default = () => {
    const envVars = {
        salt_value: process.env.SALT_VALUE,
        signature_value: process.env.SIGNATURE_VALUE,
    };
    return envVars;
};
//# sourceMappingURL=config.js.map