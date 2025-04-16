const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.cookies.token || req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ msg: "Authentication token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Attach userId to request
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};

module.exports = auth;
