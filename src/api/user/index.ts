//import express and the router from the express

import express from "express";
const router = express.Router();

//import UserController from the User.Controller

import userController from "./user.controller";
const userCtrl = new userController();

// Set the routes for get,post ,update,and delete the user in mongodb

router.get("/get-user/:id", userCtrl.getUser);
router.get("/get-user/", userCtrl.getAllUser);

router.get(
  "/user-performance",
  userCtrl.getUserForPerformance,
  userCtrl.getUserPerformance
);

router.post("/post-user", userCtrl.insertUser);

router.post("/login", userCtrl.authUser);

router.put("/put-user/:id", userCtrl.updateUser);

router.delete("/delete-user/:id", userCtrl.deleteUser);

module.exports = router;
