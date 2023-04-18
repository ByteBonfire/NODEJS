"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const employee_model_1 = __importDefault(require("./employee.model"));
class EmployeeController {
    constructor() {
        this.model = employee_model_1.default;
        this.getAllEmployee = (req, res, next) => {
            employee_model_1.default.find({})
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
        this.insertEmployee = (req, res, next) => {
            const newEmployee = new employee_model_1.default(req.body);
            console.log(newEmployee);
            newEmployee.save().then((response) => {
                return res.status(200).send(response);
            }, (error) => {
                return res.status(500).json({ error: error });
            });
        };
        this.updateEmployee = (req, res, next) => {
            const employeeId = req.params.id;
            const update = {};
            for (const key in req.body) {
                update[key] = req.body[key];
            }
            employee_model_1.default.updateOne({ _id: employeeId }, update)
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
            employee_model_1.default.deleteOne({ _id: employeeId })
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
exports.default = EmployeeController;
//# sourceMappingURL=employee.controller.js.map