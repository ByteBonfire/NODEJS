import authservice from "../middleWare/auth.service";
import employeeController from "./employee.controller";

const employeeCtrl = new employeeController();

const authoCtrl = new authservice();

import express from "express";
const router = express.Router();

router.get("/get-employee/", employeeCtrl.getAllEmployee);

router.get("/get-employee/:id", employeeCtrl.getEmployee);

router.post(
  "/add-employee/",
  authoCtrl.verifyToken,
  employeeCtrl.insertEmployee
);

router.put("/update-employee/:id", employeeCtrl.updateEmployee);

router.delete("/delete-employee/:id", employeeCtrl.deleteEmployee);

module.exports = router;
