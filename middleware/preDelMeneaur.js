const Dump = require("../models/ExEmployee");
const Employees = require("../models/Employees.model");


const preDelMeneaur = async (req, res, next) => {
  const { empId } = req.params;

  const employee = await Employees.findOne({ _id: empId });

  if (!employee)
    res
      .status(404)
      .json({ message: "No Employee found with this employee ID." + empId });

  await Dump.create({ resource: JSON.stringify(employee) });

  next();
};

module.exports = preDelMeneaur;
