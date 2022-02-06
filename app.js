const express = require("express");
let products = require("./Data/data.js");
const routes = require("./apis/products/routes");
const connectDb = require("./database/database");

const app = express();

app.use(express.json());

app.use(routes);

const port = 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  connectDb();
});
