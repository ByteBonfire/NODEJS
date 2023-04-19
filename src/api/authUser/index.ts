import authUserController from "./authuser.controller";
const authCtrl = new authUserController();

import express from "express";
const router = express.Router();

router.post("/signup/", authCtrl.insertUser);
router.post("/login/", authCtrl.insertUser);

module.exports = router;
