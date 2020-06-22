const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwToken = process.env.TOKEN;

export default (req: any, res: any, next: any) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ error: "No token, auth failed" });
  }
  try {
    const check = jwt.verify(token, jwToken);
    req.user = check;
    next();
  } catch (err) {
    res.status(400).json({ error: "Token not valid" });
  }
};
