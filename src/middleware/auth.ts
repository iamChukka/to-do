import jwt from "jsonwebtoken";
import config from "../config/Config";

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

export default auth;
