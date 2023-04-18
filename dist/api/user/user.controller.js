"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const user_model_1 = __importDefault(require("./user.model"));
class userController {
    constructor() {
        this.model = user_model_1.default;
        this.getAllUser = (req, res, next) => {
            user_model_1.default.find({})
                .then((response) => {
                return res.status(200).json(response);
            })
                .catch((error) => {
                return res.status(500).json({ message: "Error Retriving User", error });
            });
        };
        this.getUser = (req, res, next) => {
            console.log(req.params.id);
            user_model_1.default.find({ _id: new mongodb_1.ObjectId(req.params.id) }).then((response) => {
                console.log(response);
                return res.status(200).json({ users: response });
            }, (error) => {
                return res.status(500).json({ error: error });
            });
        };
        this.insertUser = (req, res, next) => {
            const newuser = new user_model_1.default(req.body);
            newuser.save().then((response) => {
                return res.status(500).send(response);
            }, (error) => { });
        };
        this.updateUser = (req, res, next) => {
            const UserId = req.params.id;
            const update = {};
            for (const key in req.body) {
                update[key] = req.body[key];
            }
            user_model_1.default.updateOne({ _id: UserId }, update)
                .then((response) => {
                if (response.modifiedCount > 0) {
                    res.status(200).json({
                        message: "user updated successfully",
                        response,
                    });
                }
                else {
                    res.status(200).json({
                        message: "user was not updated",
                        response,
                    });
                }
            })
                .catch((error) => {
                console.error(error);
                res.status(500).json({ error: "Server error" });
            });
        };
        this.deleteUser = (req, res, next) => {
            const UserId = req.params.id;
            user_model_1.default.deleteOne({ _id: UserId })
                .then((result) => {
                if (result.deletedCount > 0) {
                    res.status(200).json({
                        message: "User deleted successfully",
                        data: result,
                    });
                }
                else {
                    res.status(404).json({
                        message: "User not found",
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
        this.getUserForPerformance = (req, res, next) => {
            user_model_1.default.find({ id: req.params.id }).then((response) => {
                req.performance = response;
                return next();
            }, (error) => {
                return res.status(500).json({ error: error });
            });
        };
        this.getUserPerformance = (req, res, next) => {
            console.log(req.performance);
            return res.status(200).json({ performance: req.performance });
        };
    }
}
exports.default = userController;
//# sourceMappingURL=user.controller.js.map