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
            console.log(req.body);
            const newuser = new user_model_1.default(req.body);
            console.log(newuser);
            newuser.save().then((response) => {
                console.log("response");
                return res.status(500).send(response);
            }, (error) => { });
        };
        this.updateUser = (req, res, next) => {
            const UserId = req.params.id;
            const update = new Map();
            update.set("name", req.body.name);
            update.set("address", req.body.address);
            update.set("age", req.body.age);
            update.set("email", req.body.email);
            update.set("password", req.body.password);
            user_model_1.default.updateOne({ id: UserId }, update).then((response) => {
                return res.status(500).send(response);
            }, (error) => { });
        };
        this.deleteUser = (req, res, next) => {
            user_model_1.default.deleteOne({ _id: new mongodb_1.ObjectId(req.params.id) }).then((response) => {
                return res.status(500).send(response);
            }, (error) => { });
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