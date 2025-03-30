const { default: mongoose } = require("mongoose");

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("DB is Live...")
  } catch (error) {
    console.log("DB Error : ", error);
  }
};

module.exports = connectDB;
