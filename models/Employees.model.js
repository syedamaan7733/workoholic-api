const { default: mongoose } = require("mongoose");

const emergencyContactSchema = new mongoose.Schema(
  {
    name: String,
    relationship: String,
    phone: String,
  },
  { _id: false }
);

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: [true, "email must be unique."],
  },
  phone: { type: String, required: true },
  position: String,
  department: String,
  salary: Number,
  hireDate: Date,
  status: {
    type: String,
    enums: ["Active", "On Leave", "Terminated"],
    default: "Active",
  },
  imageUrl: String,
  address: String,
  emergencyContact: emergencyContactSchema,
  skills: [String],
  projects: [String],
});

// {

//   id: "2",
// firstName: "Jane",
// lastName: "Smith",
// email: "jane.smith@example.com",
// phone: "(555) 234-5678",
// position: "Product Manager",
// department: "Product",
// salary: 95000,
// hireDate: "2020-03-10",
// status: "Active",
// : "/api/placeholder/150/150",
// address: "456 Oak Ave, Somewhere, USA",
// emergencyContact: {
//   name: "Bob Smith",
//   relationship: "Brother",
//   phone: "(555) 876-5432",
// },
// skills: ["Product Strategy", "Agile", "Market Research"],
// projects: ["Product Launch 2023", "Customer Feedback System"],
// },

// const profileInfo = new mongoose.Schema({
//   _id: false,
//   profileImage: String,
//   address: String,
//   position: {
//     type: String,
//     enums: [
//       "Sales Executive",
//       "Data Analyist",
//       "Web Developer",
//       "Intern",
//       "DB Adminstrator",
//       "Data Analyist",
//     ],
//     default: "Intern",
//   },
//   responsibility: String,
//   jobDescription: String,
//   salary: String,
//   PublicDocumentNumber: {
//     type: String,
//     required: [true, "Please provide the public document ID"],
//   },
// });

// const userSchema = new mongoose.Schema(
//   {
//     fullName: {
//       type: String,
//       required: [true, "Please provide your full name."],
//       minlength: 2,
//       maxlength: 50,
//     },
//     email: {
//       type: String,
//       required: [true, "Please provide your email."],
//       unique: [true, "Email must be unique."],
//     },
//     phone: {
//       type: String,
//       unique: true,
//       required: true,
//     },
//     gender: {
//       type: String,
//       enums: ["male", "female"],
//       required: true,
//     },
//     empInfo: profileInfo,
//   },
//   { timestamps: true }
// );

module.exports = mongoose.model("Employee", userSchema);
