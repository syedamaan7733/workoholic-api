const {
  getAllEmployee,
  updateEmployeeData,
  createEmployee,
  getSingleEmployee,
  deleteEmployeeData,
} = require("../controllers/employee.controller");
const {
  authenticateUser,
  authorizeUser,
} = require("../middleware/authentication");
const preDelMeneaur = require("../middleware/preDelMeneaur");

const router = require("express").Router();

router
  .route("/create")
  .post(authenticateUser, authorizeUser("admin"), createEmployee);

router.route("/getAll").get(getAllEmployee);

router
  .route("/:empId")
  .get(getSingleEmployee)
  .patch(authenticateUser, authorizeUser("admin"), updateEmployeeData)
  .delete(
    authenticateUser,
    authorizeUser("admin"),
    preDelMeneaur,
    deleteEmployeeData
  );

module.exports = router;
