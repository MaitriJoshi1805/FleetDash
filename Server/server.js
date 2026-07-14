require("dotenv").config();

const { connect } = require("mongoose");
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
})