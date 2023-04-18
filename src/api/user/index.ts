import express from "express";
const router = express.Router();

import userController from "./user.controller";
const userCtrl = new userController();

router.get("/get-user/:id", userCtrl.getUser);

router.get(
  "/user-performance",
  userCtrl.getUserForPerformance,
  userCtrl.getUserPerformance
);

router.post("/post-user", userCtrl.insertUser);
router.put("/put-user/:id", userCtrl.updateUser);
router.delete("/delete-user/:id", userCtrl.deleteUser);
module.exports = router;
