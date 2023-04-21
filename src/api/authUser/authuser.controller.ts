import authUser from "./authuser.model";
const crypto = require("crypto");
import getEnvVar from "../../config/config";
const jwt = require("jsonwebtoken");

export default class authUserController {
  model = authUser;

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

      //but befor save it call the pre save function in model.ts
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
    const env_value = getEnvVar();

    try {
      const { email, password } = req.body;

      const user = await authUser.findOne({ email });

      if (!user) {
        return res.status(401).send("Email not found");
      }

      const hashpassword = crypto
        .pbkdf2Sync(password, env_value.salt_value, 1000, 64, "sha512")
        .toString("hex");

      if (user.password !== hashpassword) {
        return res.status(401).send("Invalid email or password");
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to log in." });
    }
  };

  genToken = async (req, res, next) => {
    try {
      const user = await authUser.findOne({ email: req.body.email });
      const userInfo = {
        email: user.email,
        userId: user._id,
        username: user.username,
      };
      const env_value = getEnvVar();
      const token = jwt.sign({ userInfo }, env_value.signature_value, {
        expiresIn: "500000s",
      });

      res.status(200).json({ token: token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  getTokenUser = (req, res) => {
    res.json({ message: "User info accessed", user: req.user });
  };
}
