import authUserController from "./authuser.controller";
const authCtrl = new authUserController();

import authservice from "../middleWare/auth.service";
const authoCtrl = new authservice();

import express from "express";

const router = express.Router();

router.post("/signup/", authCtrl.insertUser);

router.post("/login/", authCtrl.loginUser, authCtrl.genToken);
router.get("/getuser/", authCtrl.getuser);
router.get("/verifyUser/", authoCtrl.verifyToken, authCtrl.getTokenUser);

module.exports = router;
