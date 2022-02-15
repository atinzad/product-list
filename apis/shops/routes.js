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
const passport = require("passport");

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

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  controllerAddShop
);

router.post(
  "/:shopId/products",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  controllerAddProduct
);

router.delete("/:shopId", controllerDeleteShop);

router.put("/:shopId", upload.single("image"), controllerUpdateShop);

module.exports = router;
