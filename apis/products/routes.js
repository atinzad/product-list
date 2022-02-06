const express = require("express");
const {
  controllerHelloWorld,
  controllerGetProducts,
  controllerAddProduct,
  controllerDeleteProduct,
  controllerUpdateProduct,
} = require("../../apis/products/controllers");

const router = express.Router();

router.get("/", controllerHelloWorld);

router.get("/api/products", controllerGetProducts);

router.post("/api/products", controllerAddProduct);

router.delete("/api/products/:productId", controllerDeleteProduct);

router.put("/api/products/:productId", controllerUpdateProduct);

module.exports = router;
