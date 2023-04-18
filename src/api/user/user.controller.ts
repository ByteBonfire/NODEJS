import { ObjectId } from "mongodb";
import User from "./user.model";

export default class userController {
  model = User;

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
    console.log(req.body);
    const newuser = new User(req.body);
    console.log(newuser);
    newuser.save().then(
      (response) => {
        console.log("response");
        return res.status(500).send(response);
      },
      (error) => {}
    );
  };

  updateUser = (req, res, next) => {
    const UserId = req.params.id;
    const update = new Map();
    update.set("name", req.body.name);
    update.set("address", req.body.address);
    update.set("age", req.body.age);
    update.set("email", req.body.email);
    update.set("password", req.body.password);
    User.updateOne({ id: UserId }, update).then(
      (response) => {
        return res.status(500).send(response);
      },
      (error) => {}
    );
  };

  deleteUser = (req, res, next) => {
    User.deleteOne({ _id: new ObjectId(req.params.id) }).then(
      (response) => {
        return res.status(500).send(response);
      },
      (error) => {}
    );
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
