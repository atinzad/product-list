const Products = require("../../models/Product");

exports.controllerHelloWorld = (req, res) => {
  res.send("hello world");
};

exports.controllerGetProducts = async (req, res, next) => {
  try {
    const products = await Products.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

exports.controllerAddProduct = async (req, res, next) => {
  try {
    const product = req.body;
    const productCreated = await Products.create(product);
    res.status(201).json({ msg: "Created", payload: productCreated });
  } catch (error) {
    next(error);
  }
};

exports.controllerDeleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const productDeleted = await Products.findByIdAndDelete(productId);
    if (productDeleted) {
      res.status(204).end();
    } else {
      const error = new Error(`could not find ${productId}`);
      error.status = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

exports.controllerUpdateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = req.body;
    const productUpdated = await Products.findOneAndUpdate(productId, product, {
      new: true,
    });
    if (productUpdated) {
      res.status(200).json({ msg: "Product Updated", payload: productUpdated });
    } else {
      const error = new Error(`could not find ${productId}`);
      error.status = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
