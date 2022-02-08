const express = require("express");
let products = require("./Data/data.js");
const routes = require("./apis/products/routes");
const connectDb = require("./database/database");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
});

app.use(routes);

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
