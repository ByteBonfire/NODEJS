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
const jwt = require("jsonwebtoken");
class authUserController {
    constructor() {
        this.model = authuser_model_1.default;
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
                //but befor save it call the pre save function in model.ts
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
            const env_value = (0, config_1.default)();
            try {
                const { email, password } = req.body;
                const user = yield authuser_model_1.default.findOne({ email });
                if (!user) {
                    return res.status(401).send("Email not found");
                }
                const hashpassword = crypto
                    .pbkdf2Sync(password, env_value.salt_value, 1000, 64, "sha512")
                    .toString("hex");
                if (user.password !== hashpassword) {
                    return res.status(401).send("Invalid email or password");
                }
                next();
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Failed to log in." });
            }
        });
        this.genToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield authuser_model_1.default.findOne({ email: req.body.email });
                const userInfo = {
                    email: user.email,
                    userId: user._id,
                    username: user.username,
                };
                const env_value = (0, config_1.default)();
                const token = jwt.sign({ userInfo }, env_value.signature_value, {
                    expiresIn: "500000s",
                });
                res.status(200).json({ token: token });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Internal Server Error" });
            }
        });
        this.getTokenUser = (req, res) => {
            res.json({ message: "User info accessed", user: req.user });
        };
    }
}
exports.default = authUserController;
//# sourceMappingURL=authuser.controller.js.map