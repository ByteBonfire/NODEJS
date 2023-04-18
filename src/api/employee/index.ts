import EmployeeController from "./employee.controller";
const EmployeeCtrl = new EmployeeController();

import express from "express";
const router = express.Router();

router.get("/get-employee/", EmployeeCtrl.getAllEmployee);

router.get("/get-employee/:id", EmployeeCtrl.getEmployee);

router.post("/post-employee/", EmployeeCtrl.insertEmployee);

router.put("/put-employee/:id", EmployeeCtrl.updateEmployee);

router.delete("/delete-employee/:id", EmployeeCtrl.deleteEmployee);

module.exports = router;
