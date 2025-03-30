const jwt = require("jsonwebtoken");

const createToken = async (user) => {
  const payload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  return token;
};

const isValidToken = (token) => jwt.verify(token, process.env.JWT_SECRET);
module.exports = { createToken, isValidToken };
