"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
exports.default = {
    Salt: process.env.SALT_VALUE,
};
//# sourceMappingURL=config.js.map