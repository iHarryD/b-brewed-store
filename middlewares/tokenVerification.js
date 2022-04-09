const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send({ message: "Access Denied!" });
  try {
    const isTokenAuth = jwt.verify(token, process.env.JWT_SECRET);
    req.user = isTokenAuth.user;
    next();
  } catch (err) {
    res.status(400).send({ message: "Invalid Token!" });
  }
}

module.exports = verifyToken;
