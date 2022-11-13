require("dotenv").config();
const express = require("express");
const colors = require("colors");
const logger = require("morgan");
const { connectDB } = require("./utils/db");
const { protected } = require("./utils/token");
const app = express();
const { errorHandler } = require("./middleware/error.middleware");
connectDB();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));

// routes
app.use("/api/users", require("./components/user/user.route"));
app.get("/dashboard", protected, (req, res) => {
  res.send("Your secret key is batman");
});

app.use(errorHandler);
let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.blue);
});
