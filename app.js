const express = require("express");
let products = require("./Data/data.js");
const productRoutes = require("./apis/products/routes");
const shopRoutes = require("./apis/shops/routes");
const userRoutes = require("./apis/users/routes");
const connectDb = require("./database/database");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
});

app.use("/api/products", productRoutes);
app.use("/api/shops", shopRoutes);
app.use(userRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));
console.log(path.join(__dirname, "media"));

app.use((req, res, next) => {
  res.status(404).json({ msg: "Path Not Found" });
});

app.use((error, req, res, next) => {
  res
    .status(error.status || 500)
    .json({ msg: error.message || "Internal Server error" });
  next();
});

const port = 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  connectDb();
});
