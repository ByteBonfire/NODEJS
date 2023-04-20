import authUserController from "./authuser.controller";
const authCtrl = new authUserController();

import express from "express";
const router = express.Router();

router.post("/signup/", authCtrl.insertUser);
router.post("/login/", authCtrl.loginUser, (req: any, res, next) => {
  console.log("adfasdf", req.SUCESS_MESSAGE);
});
router.get("/getuser/", authCtrl.getuser);

module.exports = router;
