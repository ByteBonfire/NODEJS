"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose = require("mongoose");
exports.userSchema = new mongoose.Schema({
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
exports.default = mongoose.model("User", exports.userSchema);
//# sourceMappingURL=user.model.js.map