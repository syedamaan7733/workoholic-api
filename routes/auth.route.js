const {
  register,
  login,
  logout,
  checkMe,
} = require("../controllers/auth.controllers");
const { authenticateUser } = require("../middleware/authentication");

const router = require("express").Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(authenticateUser, logout);
router.route("/checkMe").get(authenticateUser, checkMe);

module.exports = router;
