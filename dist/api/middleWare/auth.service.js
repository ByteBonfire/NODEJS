"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const config_1 = __importDefault(require("../../config/config"));
const jwt = require("jsonwebtoken");
class authservice {
    constructor() {
        this.getTokenFromAuthorizationHeader = (authorizationHeader) => {
            if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
                return null;
            }
            const token = authorizationHeader.slice("Bearer ".length);
            // const token = authorizationHeader.split("")[1];
            return token;
        };
        this.verifyToken = (req, res, next) => {
            const token = this.getTokenFromAuthorizationHeader(req.headers.authorization);
            if (!token) {
                return res.status(401).json({ message: "Unauthorized: missing token" });
            }
            try {
                const env_value = (0, config_1.default)();
                const decodedToken = jwt.verify(token, env_value.signature_value);
                req.user = decodedToken;
                next();
            }
            catch (error) {
                return res.status(401).json({ message: "Unauthorized: invalid token" });
            }
        };
    }
}
exports.default = authservice;
//# sourceMappingURL=auth.service.js.map