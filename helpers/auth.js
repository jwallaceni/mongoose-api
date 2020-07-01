const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ');
    if (token[0]==='Bearer' && jwt.verify(token[1], process.env.JWT_SECRET)) {
      next();
    }
  } catch(err) {
    res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = requireAuth;