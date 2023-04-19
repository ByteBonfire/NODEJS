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
const user_model_1 = __importDefault(require("./user.model"));
const bcrypt = require("bcrypt");
class userController {
    constructor() {
        this.model = user_model_1.default;
        // get all user
        this.getAllUser = (req, res, next) => {
            user_model_1.default.find({})
                .then((response) => {
                return res.status(200).json(response);
            })
                .catch((error) => {
                return res.status(500).json({ message: "Error Retriving User", error });
            });
        };
        // get specific user with id
        this.getUser = (req, res, next) => {
            console.log(req.params.id);
            //check the userID and get the data
            user_model_1.default.find({ _id: new mongodb_1.ObjectId(req.params.id) }).then((response) => {
                console.log(response);
                return res.status(200).json({ users: response });
            }, (error) => {
                return res.status(500).json({ error: error });
            });
        };
        // insert the user in database
        this.insertUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                //check existing email address
                const existingUser = yield user_model_1.default.findOne({ email: req.body.email });
                if (existingUser) {
                    return res.status(409).send("User with this email already exists");
                }
                // Generate salt
                const salt = yield bcrypt.genSalt(10);
                if (!salt) {
                    throw new Error("Failed to generate salt for password hashing");
                }
                // Hash password and create new user
                const hashedPassword = yield bcrypt.hash(req.body.password, salt);
                const newUser = new user_model_1.default({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword,
                    age: req.body.age,
                    address: req.body.address,
                });
                yield newUser.save();
                return res.status(201).send(newUser);
            }
            catch (err) {
                console.error(err);
                return res.status(500).send("Internal Server Error");
            }
            // this below code is to directly insert the user without hashing & salting user info
            // const newuser = new User(req.body);
            //    newuser.save().then(
            //     (response) => {
            //       return res.status(201).send(response);
            //     },
            //     (error) => {
            //       return res.status(500).send();
            //     }
            //   );
        });
        // Authenticate the user
        this.authUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const authUser = yield user_model_1.default.findOne({ email: req.body.email }).exec();
                if (!authUser) {
                    return res.status(400).send("Cannot find user");
                }
                if (yield bcrypt.compare(req.body.password, authUser.password)) {
                    res.send("Success");
                }
                else {
                    res.send("Not Allowed");
                }
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
        // update the specific user
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
        // delete the specific user
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
        // get the performance and understand the next() function
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