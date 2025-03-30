const { isValidToken } = require("../utils/jwt");

const authenticateUser = (req, res, next) => {
  try {
    // console.log(req.headers["authorization"], req.cookies["access_workH_tkn"]);
    const token =
      req.header["authorization"]?.split(" ")[1] ||
      req.cookies["access_workH_tkn"];

    const { userId, email, role } = isValidToken(token);

    req.user = { userId, email, role };

    console.log(valid);
    next();
  } catch (error) {
    console.log(error);
  }
};

const authorizeUser = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      res.status(401).json({
        error: true,
        message: "You are not authorized to access this route.",
      });

    next();
  };
};

module.exports = { authenticateUser, authorizeUser };
