const Employees = require("../models/Employees.model");

// Admin can
//create
const createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({ error: "Please provide the valid input." });
    }

    const employee = await Employees.create({ ...req.body });

    return res
      .status(201)
      .json({ message: "employee have been created", employee });
  } catch (error) {
    console.log("Getting All Employees Error", error);
    res.status(400).json({ message: error.message });
  }
};

//Read
const getAllEmployee = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const skip = (pageNumber - 1) * limitNumber;

    // calling db
    const employees = await Employees.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);

    const totalCount = await Employees.countDocuments();
    const totalpages = Math.ceil(totalCount / limitNumber);

    return res.status(200).json({ employees, totalCount, totalpages });
  } catch (error) {
    console.log("Getting All Employees Error", error);
    res.status(400).json({ message: error.message });
  }
}; // admin and all employee (sepefic Data Only)

const getSingleEmployee = async (req, res) => {
  try {
    const { empId } = req.params;

    if (!empId)
      res.status(400).json({ error: "Please provide the employess in params" });

    const employee = await Employees.findOne({ _id: empId });

    if (!employee)
      res.status(404).json({ error: "Employee not with this id" + empId });

    res.status(200).json(employee);
  } catch (error) {
    console.log("Getting Single Employees Error", error);
    res.status(400).json({ message: error.message });
  }
}; // admin

//Uodate
const updateEmployeeData = async (req, res) => {
  try {
    console.log("Data Recieved", req.params, req.body);

    const { empId } = req.params;
    if (!empId)
      res.status(400).json({ error: "Please provide the userId in params." });

    const emp = await Employees.findById({ _id: empId });

    if (!emp) res.status(404).json({ error: "employee does not found." });

    Object.keys(req.body).forEach((key) => {
      emp[key] = req.body[key];
    });

    await emp.save();

    res.json({
      message: `Employee data with ID ${emp._id} has been updated.`,
      emp,
    });
  } catch (error) {
    console.log("Getting Single Employees Error", error);
    res.status(400).json({ message: error.message });
  }
}; // admin or employee itself

//Delete
const deleteEmployeeData = async (req, res) => {
  try {
    const { empId } = req.params;
    const employee = await Employees.findOne({ _id: empId });

    if (!employee || employee.length === 0)
     return res.status(404).json({ error: "No employee with this ID." });

    await Employees.deleteOne({ _id: empId });

  return  res.status(200).json({ message: "Your data have been deleted." });
  } catch (error) {
    console.log("Deleting Employee Error", error);
    res.status(400).json({ message: error.message });
  }
}; // admin

module.exports = {
  createEmployee,
  getAllEmployee,
  getSingleEmployee,
  updateEmployeeData,
  deleteEmployeeData,
};
