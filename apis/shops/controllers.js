const Shops = require("../../models/Shop");
const Products = require("../../models/Product");

exports.fetchShop = async (shopId, next) => {
  try {
    const shop = Shops.findById(shopId);
    if (shop) {
      return shop;
    } else {
      const error = new Error(`could not find ${shopId}`);
      error.status = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

exports.controllerAddProduct = async (req, res, next) => {
  try {
    req.body.shopId = req.params.shopId;
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const product = req.body;
    const productCreated = await Products.create(product);
    await Shops.findOneAndUpdate(
      req.body.shopId,
      { $push: { products: productCreated._id } },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(201).json({ msg: "Created", payload: productCreated });
  } catch (error) {
    next(error);
  }
};

exports.controllerGetShops = async (req, res, next) => {
  try {
    const shops = await Shops.find().populate("products");
    res.json(shops);
  } catch (error) {
    next(error);
  }
};

exports.controllerAddShop = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const shop = req.body;
    const shopCreated = await Shops.create(shop);
    res.status(201).json({ msg: "Created", payload: shopCreated });
  } catch (error) {
    next(error);
  }
};

exports.controllerDeleteShop = async (req, res, next) => {
  try {
    const shopId = req.shop._id;
    await Shops.findByIdAndDelete(shopId);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.controllerUpdateShop = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const shopId = req.shop._id;
    const shop = req.body;
    const shopUpdated = await Shops.findOneAndUpdate(shopId, shop, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ msg: "Shop Updated", payload: shopUpdated });
  } catch (error) {
    next(error);
  }
};
