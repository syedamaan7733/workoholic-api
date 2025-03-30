const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must provide the name"],
  },
  email: {
    type: String,
    required: [true, "Must provide the email"],
    unique: [true, "This email already exist"],
  },
  password: {
    type: String,
    required: [true, "must need hashed password."],
  },
  role: {
    type: String,
    enums: ["admin", "viewer"],
    default: "viewer",
  },
  image: String,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isValidPassword = await bcrypt.compare(
    candidatePassword,
    this.password
  );
  return isValidPassword;
};

module.exports = mongoose.model("User", userSchema);
