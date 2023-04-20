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
const authuser_model_1 = __importDefault(require("./authuser.model"));
const crypto = require("crypto");
const config_1 = __importDefault(require("../../config/config"));
class authUserController {
    constructor() {
        this.model = authuser_model_1.default;
        this.insertUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log(req.body);
                // checking the existing email address
                const existingUser = yield authuser_model_1.default.findOne({ email: req.body.email });
                if (existingUser) {
                    return res.status(409).send(" email already exists");
                }
                //   create the newUser object
                const newUser = new authuser_model_1.default(req.body);
                // console.log(newUser, "newuser");
                //   Save the user in database
                newUser.save().then((response) => {
                    // console.log(response);
                    res.status(200).json({ message: "this user is created" });
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Failed to insert user." });
            }
        });
        this.loginUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            // const salt= config.Salt
            try {
                const { email, password } = req.body;
                const user = yield authuser_model_1.default.findOne({ email });
                if (!user) {
                    return res.status(401).send("Email not found");
                }
                const hashpassword = crypto
                    .pbkdf2Sync(password, config_1.default.Salt, 1000, 64, "sha512")
                    .toString("hex");
                if (user.password !== hashpassword) {
                    return res.status(401).send("Invalid email or password");
                }
                // res.status(200).json({ message: "Logged in successfully" });
                req.SUCESS_MESSAGE = "logged in sucessfully";
                return next();
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Failed to log in." });
            }
        });
        this.getuser = (req, res, next) => {
            authuser_model_1.default
                .find({})
                .then((responses) => {
                res.status(200).json(responses);
            })
                .catch((error) => {
                res.status(500).json({ message: "Error retrieving user", error });
            });
        };
    }
}
exports.default = authUserController;
//# sourceMappingURL=authuser.controller.js.map