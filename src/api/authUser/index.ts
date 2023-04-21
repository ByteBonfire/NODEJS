import authUserController from "./authuser.controller";
const authCtrl = new authUserController();
import jwtController from "../middleWare/jwtToken.controller";
const jwtCtrl = new jwtController();

import express from "express";
const router = express.Router();

router.post("/signup/", authCtrl.insertUser);

router.post("/login/", authCtrl.loginUser, authCtrl.genToken);
router.get("/getuser/", authCtrl.getuser);
router.get("/tokenuser/", jwtCtrl.verifyToken, authCtrl.getTokenUser);

module.exports = router;
