const { default: mongoose } = require("mongoose");

const profileInfo = new mongoose.Schema({
  _id: false,
  profileImage: String,
  address: String,
  position: {
    type: String,
    enums: [
      "Sales Executive",
      "Data Analyist",
      "Web Developer",
      "Intern",
      "DB Adminstrator",
    ],
    default: "Intern",
  },
  responsibility: String,
  jobDescription: String,
  salary: String,
  PublicDocumentNumber: {
    type: String,
    required: [true, "Please provide the public document ID"],
  },
});

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please provide your full name."],
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Please provide your email."],
      unique: [true, "Email must be unique."],
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    empInfo: profileInfo,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", userSchema);
