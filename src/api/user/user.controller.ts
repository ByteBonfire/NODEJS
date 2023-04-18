import { ObjectId } from "mongodb";
import User from "./user.model";
import userModel from "./user.model";

export default class userController {
  model = User;

  getAllUser = (req, res, next) => {
    User.find({})
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json({ message: "Error Retriving User", error });
      });
  };

  getUser = (req, res, next) => {
    console.log(req.params.id);
    User.find({ _id: new ObjectId(req.params.id) }).then(
      (response) => {
        console.log(response);
        return res.status(200).json({ users: response });
      },
      (error) => {
        return res.status(500).json({ error: error });
      }
    );
  };

  insertUser = (req, res, next) => {
    const newuser = new User(req.body);

    newuser.save().then(
      (response) => {
        return res.status(500).send(response);
      },
      (error) => {}
    );
  };

  updateUser = (req, res, next) => {
    const UserId = req.params.id;
    const update = {};

    for (const key in req.body) {
      update[key] = req.body[key];
    }

    User.updateOne({ _id: UserId }, update)
      .then((response) => {
        if (response.modifiedCount > 0) {
          res.status(200).json({
            message: "user updated successfully",
            response,
          });
        } else {
          res.status(200).json({
            message: "user was not updated",
            response,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Server error" });
      });
  };

  deleteUser = (req, res, next) => {
    const UserId = req.params.id;

    User.deleteOne({ _id: UserId })
      .then((result) => {
        if (result.deletedCount > 0) {
          res.status(200).json({
            message: "User deleted successfully",
            data: result,
          });
        } else {
          res.status(404).json({
            message: "User not found",
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

  getUserForPerformance = (req, res, next) => {
    User.find({ id: req.params.id }).then(
      (response) => {
        req.performance = response;
        return next();
      },
      (error) => {
        return res.status(500).json({ error: error });
      }
    );
  };

  getUserPerformance = (req, res, next) => {
    console.log(req.performance);
    return res.status(200).json({ performance: req.performance });
  };
}
