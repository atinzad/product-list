const express = require("express");

const upload = require("../../middleware/multer");

const {
  controllerGetShops,
  controllerAddShop,
  controllerDeleteShop,
  controllerUpdateShop,
  fetchShop,
  controllerAddProduct,
} = require("../../apis/shops/controllers");

const router = express.Router();

router.param("shopId", async (req, res, next, shopId) => {
  try {
    const shop = await fetchShop(shopId, next);
    req.shop = shop;
    next();
  } catch (error) {
    next(error);
  }
});

router.get("/", controllerGetShops);

router.post("/", upload.single("image"), controllerAddShop);

router.post("/:shopId/products", upload.single("image"), controllerAddProduct);

router.delete("/:shopId", controllerDeleteShop);

router.put("/:shopId", upload.single("image"), controllerUpdateShop);

module.exports = router;
