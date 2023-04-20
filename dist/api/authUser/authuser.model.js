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
const config_1 = __importDefault(require("../../config/config"));
const mongoose_1 = __importDefault(require("mongoose"));
const crypto = require("crypto");
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
    },
});
const salt = config_1.default.Salt;
authUserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        //   console.log(user);
        if (!user.isModified("password"))
            return next();
        //   const salt = crypto.randomBytes(16).toString("hex");
        console.log(salt);
        const hash = crypto
            .pbkdf2Sync(user.password, salt, 1000, 64, `sha512`)
            .toString(`hex`);
        user.password = hash;
        next();
    });
});
exports.default = mongoose_1.default.model("authUser", authUserSchema);
//# sourceMappingURL=authuser.model.js.map