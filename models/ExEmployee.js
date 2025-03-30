const { default: mongoose } = require("mongoose");

const exEmpSchema = new mongoose.Schema(
  {
    resource: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ExEmp", exEmpSchema);
