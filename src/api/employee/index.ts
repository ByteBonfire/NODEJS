import employeeController from "./employee.controller";
const employeeCtrl = new employeeController();

import express from "express";
const router = express.Router();

router.get("/get-employee/", employeeCtrl.getAllEmployee);

router.get("/get-employee/:id", employeeCtrl.getEmployee);

router.post("/post-employee/", employeeCtrl.insertEmployee);

router.put("/put-employee/:id", employeeCtrl.updateEmployee);

router.delete("/delete-employee/:id", employeeCtrl.deleteEmployee);

module.exports = router;
