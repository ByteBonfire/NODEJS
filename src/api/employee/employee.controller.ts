import { ObjectId } from "mongodb";
import employee from "./employee.model";

export default class employeeController {
  model = employee;

  getAllEmployee = (req, res, next) => {
    employee
      .find({})
      .then((responses) => {
        res.status(200).json(responses);
      })
      .catch((error) => {
        res.status(500).json({ message: "Error retrieving employees", error });
      });
  };

  getEmployee = (req, res, next) => {
    employee.find({ _id: new ObjectId(req.params.id) }).then(
      (response) => {
        return res.status(200).json({ employees: response });
      },
      (error) => {
        return res.status(500).json({ error: error });
      }
    );
  };

  insertEmployee = async (req, res, next) => {
    const existingUser = await employee.findOne({
      email: req.body.email,
    });

    if (existingUser) {
      return res.status(409).send(" Email already exists");
    }
    const newEmployee = new employee(req.body);
    console.log(newEmployee);
    newEmployee.save().then(
      (response) => {
        return res.status(200).send(response);
      },
      (error) => {
        return res.status(500).json({ error: error });
      }
    );
  };

  updateEmployee = (req, res, next) => {
    const employeeId = req.params.id;
    const update = {};

    for (const key in req.body) {
      update[key] = req.body[key];
    }

    employee
      .updateOne({ _id: employeeId }, update)
      .then((response) => {
        if (response.modifiedCount > 0) {
          res.status(200).json({
            message: "Employee updated successfully",
            response,
          });
        } else {
          res.status(200).json({
            message: "Employee was not updated",
            response,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Server error" });
      });
  };

  deleteEmployee = (req, res, next) => {
    const employeeId = req.params.id;

    employee
      .deleteOne({ _id: employeeId })
      .then((result) => {
        if (result.deletedCount > 0) {
          res.status(200).json({
            message: "Employee deleted successfully",
            data: result,
          });
        } else {
          res.status(404).json({
            message: "Employee not found",
          });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          error: "Server error",
        });
      });
  };
}
