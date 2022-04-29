const config = require("../config/Config");
const jwt = require("jsonwebtoken");

function auth(req: any, res: any, next: any) {
  const token = req.header("x-auth-token");
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, config.TODO_JWTPRIVATEKEY);
    req.user = decoded;

    next();
  } catch (ex) {
    res.status(400).json({ message: "Invalid Token" });
  }
}

module.exports = auth;
