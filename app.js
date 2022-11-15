require("dotenv").config();
const express = require("express");
const colors = require("colors");
const logger = require("morgan");
const { connectDB } = require("./utils/db");
const { protected } = require("./utils/token");
const { errorHandler } = require("./middleware/error.middleware");
const { uploadImage, getUrl, getMultipleUrl } = require("./utils/upload");
const app = express();
connectDB();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use("/uploads", express.static("uploads"));

// routes
app.use("/api/users", require("./components/user/user.route"));
app.use("/api/products", require("./components/product/product.route"));
app.use("/api/orders", require("./components/orders/order.route"));

// image upload route
app.use("/api/uploads/image-single", uploadImage.single("image"), getUrl);
app.use(
  "/api/uploads/image-multiple",
  uploadImage.array("images"),
  getMultipleUrl
);

// protected route
app.get("/dashboard", protected, (req, res) => {
  res.send("Your secret key is batman");
});

app.use(errorHandler);
let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.blue);
});
