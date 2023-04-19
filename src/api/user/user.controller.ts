import { ObjectId } from "mongodb";
import User from "./user.model";
const bcrypt = require("bcrypt");

export default class userController {
  model = User;

  // get all user
  getAllUser = (req, res, next) => {
    User.find({})
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json({ message: "Error Retriving User", error });
      });
  };

  // get specific user with id

  getUser = (req, res, next) => {
    console.log(req.params.id);
    //check the userID and get the data

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

  // insert the user in database

  insertUser = async (req, res, next) => {
    try {
      //check existing email address
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(409).send("User with this email already exists");
      }
      // Generate salt
      const salt = await bcrypt.genSalt(10);
      if (!salt) {
        throw new Error("Failed to generate salt for password hashing");
      }

      // Hash password and create new user
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        age: req.body.age,
        address: req.body.address,
      });
      await newUser.save();

      return res.status(201).send(newUser);
    } catch (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    // this below code is to directly insert the user without hashing & salting user info

    // const newuser = new User(req.body);
    //    newuser.save().then(

    //     (response) => {
    //       return res.status(201).send(response);
    //     },
    //     (error) => {
    //       return res.status(500).send();
    //     }
    //   );
  };

  // Authenticate the user

  authUser = async (req, res, next) => {
    try {
      const authUser = await User.findOne({ email: req.body.email }).exec();
      if (!authUser) {
        return res.status(400).send("Cannot find user");
      }
      if (await bcrypt.compare(req.body.password, authUser.password)) {
        res.send("Success");
      } else {
        res.send("Not Allowed");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };

  // update the specific user

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

  // delete the specific user

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

  // get the performance and understand the next() function

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
