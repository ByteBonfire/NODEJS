import getEnvVar from "../../config/config";
const jwt = require("jsonwebtoken");

export default class authservice {
  getTokenFromAuthorizationHeader = (authorizationHeader) => {
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return null;
    }
    const token = authorizationHeader.slice("Bearer ".length);
    // const token = authorizationHeader.split("")[1];
    return token;
  };

  verifyToken = (req, res, next) => {
    const token = this.getTokenFromAuthorizationHeader(
      req.headers.authorization
    );
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: missing token" });
    }
    try {
      const env_value = getEnvVar();
      const decodedToken = jwt.verify(token, env_value.signature_value);
      req.user = decodedToken;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized: invalid token" });
    }
  };
}
