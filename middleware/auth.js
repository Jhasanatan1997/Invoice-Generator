const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;
const errors = require('../utils/errors/error');
const User = require('../models/User');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) throw new errors.NotAuthorized('authorization token is missing');
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded;
    // userId = User
    next();

  } catch (err) {
    throw new errors.NotAuthorized('Invalid Token');
  }
};

module.exports = authMiddleware;