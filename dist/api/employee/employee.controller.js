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
const mongodb_1 = require("mongodb");
const employee_model_1 = __importDefault(require("./employee.model"));
class employeeController {
    constructor() {
        this.model = employee_model_1.default;
        this.getAllEmployee = (req, res, next) => {
            employee_model_1.default
                .find({})
                .then((responses) => {
                res.status(200).json(responses);
            })
                .catch((error) => {
                res.status(500).json({ message: "Error retrieving employees", error });
            });
        };
        this.getEmployee = (req, res, next) => {
            employee_model_1.default.find({ _id: new mongodb_1.ObjectId(req.params.id) }).then((response) => {
                return res.status(200).json({ employees: response });
            }, (error) => {
                return res.status(500).json({ error: error });
            });
        };
        this.insertEmployee = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield employee_model_1.default.findOne({
                email: req.body.email,
            });
            if (existingUser) {
                return res.status(409).send(" Email already exists");
            }
            const newEmployee = new employee_model_1.default(req.body);
            console.log(newEmployee);
            newEmployee.save().then((response) => {
                return res.status(200).send(response);
            }, (error) => {
                return res.status(500).json({ error: error });
            });
        });
        this.updateEmployee = (req, res, next) => {
            const employeeId = req.params.id;
            const update = {};
            for (const key in req.body) {
                update[key] = req.body[key];
            }
            employee_model_1.default
                .updateOne({ _id: employeeId }, update)
                .then((response) => {
                if (response.modifiedCount > 0) {
                    res.status(200).json({
                        message: "Employee updated successfully",
                        response,
                    });
                }
                else {
                    res.status(200).json({
                        message: "Employee was not updated",
                        response,
                    });
                }
            })
                .catch((error) => {
                console.error(error);
                res.status(500).json({ error: "Server error" });
            });
        };
        this.deleteEmployee = (req, res, next) => {
            const employeeId = req.params.id;
            employee_model_1.default
                .deleteOne({ _id: employeeId })
                .then((result) => {
                if (result.deletedCount > 0) {
                    res.status(200).json({
                        message: "Employee deleted successfully",
                        data: result,
                    });
                }
                else {
                    res.status(404).json({
                        message: "Employee not found",
                    });
                }
            })
                .catch((error) => {
                console.error(error);
                res.status(500).json({
                    error: "Server error",
                });
            });
        };
    }
}
exports.default = employeeController;
//# sourceMappingURL=employee.controller.js.map