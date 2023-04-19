"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const crypto = require("crypto");
const dotenv = require("dotenv");
const fs = require("fs");
const authUserSchema = new mongoose_1.default.Schema({
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
        // default: process.env.SECRET_SALT_KEY,
    },
});
authUserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        //   console.log(user);
        if (!user.isModified("password"))
            return next();
        //   const salt = crypto.randomBytes(16).toString("hex");
        const hash = crypto
            .pbkdf2Sync(user.password, process.env.SALT, 1000, 64, `sha512`)
            .toString(`hex`);
        // Load environment variables from .env file
        //   dotenv.config();
        //   // Set SALT variable to the generated salt
        //   process.env.SALT = salt;
        //   // Update .env file with new value for SALT
        //   fs.writeFileSync(".env", "SALT=" + salt);
        user.password = hash;
        next();
    });
});
exports.default = mongoose_1.default.model("authUser", authUserSchema);
//# sourceMappingURL=authuser.model.js.map