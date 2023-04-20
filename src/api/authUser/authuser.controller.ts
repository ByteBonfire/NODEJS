import authUser from "./authuser.model";
const crypto = require("crypto");
import config from "../../config/config";
import router from "../../router";

export default class authUserController {
  model = authUser;

  insertUser = async (req, res, next) => {
    try {
      // console.log(req.body);
      // checking the existing email address
      const existingUser = await authUser.findOne({ email: req.body.email });

      if (existingUser) {
        return res.status(409).send(" email already exists");
      }
      //   create the newUser object
      const newUser = new authUser(req.body);
      // console.log(newUser, "newuser");

      //   Save the user in database
      newUser.save().then((response) => {
        // console.log(response);
        res.status(200).json({ message: "this user is created" });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to insert user." });
    }
  };

  loginUser = async (req, res, next) => {
    // const salt= config.Salt
    try {
      const { email, password } = req.body;

      const user = await authUser.findOne({ email });

      if (!user) {
        return res.status(401).send("Email not found");
      }

      const hashpassword = crypto
        .pbkdf2Sync(password, config.Salt, 1000, 64, "sha512")
        .toString("hex");

      if (user.password !== hashpassword) {
        return res.status(401).send("Invalid email or password");
      }

      // res.status(200).json({ message: "Logged in successfully" });
      req.SUCESS_MESSAGE = "logged in sucessfully";

      return next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to log in." });
    }
  };

  getuser = (req, res, next) => {
    authUser
      .find({})
      .then((responses) => {
        res.status(200).json(responses);
      })
      .catch((error) => {
        res.status(500).json({ message: "Error retrieving user", error });
      });
  };
}
