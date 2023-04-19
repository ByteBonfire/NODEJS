import authUser from "./authuser.model";

export default class AuthUserController {
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
}
