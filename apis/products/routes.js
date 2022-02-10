const express = require("express");

const upload = require("../../middleware/multer");

const {
  //controllerHelloWorld,
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

//router.get("/", controllerHelloWorld);

router.get("/", controllerGetProducts);

router.delete("/:productId", controllerDeleteProduct);

router.put("/:productId", upload.single("image"), controllerUpdateProduct);

module.exports = router;
