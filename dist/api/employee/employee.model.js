"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeSchema = void 0;
const mongoose = require("mongoose");
exports.EmployeeSchema = mongoose.Schema({
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
    post: {
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
exports.default = mongoose.model("Employee", exports.EmployeeSchema);
//# sourceMappingURL=employee.model.js.map