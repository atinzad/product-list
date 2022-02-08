const express = require("express");
const {
  controllerHelloWorld,
  controllerGetProducts,
  controllerAddProduct,
  controllerDeleteProduct,
  controllerUpdateProduct,
  fetchProduct,
} = require("../../apis/products/controllers");

const router = express.Router();

router.param("productId", async (req, res, next, productId) => {
  try {
    const product = await fetchProduct(productId, next);
    req.product = product;
    next();
  } catch (error) {
    next(error);
  }
});

router.get("/", controllerHelloWorld);

router.get("/api/products", controllerGetProducts);

router.post("/api/products", controllerAddProduct);

router.delete("/api/products/:productId", controllerDeleteProduct);

router.put("/api/products/:productId", controllerUpdateProduct);

module.exports = router;
