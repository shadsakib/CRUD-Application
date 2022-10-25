const jwt = require("jsonwebtoken");
// const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECRET = "BOOKBAG";

const auth = function (req, res, next) {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];

    if (token) {
      const user = jwt.verify(token, JWT_SECRET);
      const { id } = user;
      req.userId = id;

      next();
    } else {
      res.status(401).json({ message: "Unauthorized user" });
    }
  } catch (err) {
    res.status(401).json({ message: "Unauthorized user" });
  }
};

module.exports = auth;
