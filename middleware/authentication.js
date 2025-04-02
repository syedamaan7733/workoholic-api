const { isValidToken } = require("../utils/jwt");

const authenticateUser = (req, res, next) => {
  try {
    // console.log(req.headers["authorization"], req.cookies["access_workH_tkn"]);
    const token =
      req.headers["authorization"]?.split(" ")[1] ||
      req.cookies["access_workH_tkn"];
    if (!token)
      res.status(400).json({
        message: "THere is no access token. Attached to this request.",
      });

    const { userId, email, role } = isValidToken(token);

    if (!userId) res.status(401).json({ message: "Token is invalid." });

    req.user = { userId, email, role };

    next();
  } catch (error) {
    console.log(error);
  }
};

const authorizeUser = (...roles) => {
  return (req, res, next) => {
    console.log(req.user);
    console.log(roles.includes(req.user.role));

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        error: true,
        message: "You are not authorized to access this route.",
      });
    }

    next();
  };
};

module.exports = { authenticateUser, authorizeUser };
