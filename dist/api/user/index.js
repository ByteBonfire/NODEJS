"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_controller_1 = __importDefault(require("./user.controller"));
const userCtrl = new user_controller_1.default();
router.get("/get-user/:id", userCtrl.getUser);
router.get("/user-performance", userCtrl.getUserForPerformance, userCtrl.getUserPerformance);
router.post("/post-user", userCtrl.insertUser);
router.put("/put-user/:id", userCtrl.updateUser);
router.delete("/delete-user/:id", userCtrl.deleteUser);
module.exports = router;
//# sourceMappingURL=index.js.map