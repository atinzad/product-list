const Products = require("../../models/Product");

exports.controllerHelloWorld = (req, res) => {
  res.send("hello world");
};

exports.controllerGetProducts = async (req, res) => {
  try {
    const products = await Products.find();
    res.json(products);
  } catch (error) {
    res.status(400);
    res.json(error.msg);
  }
};

exports.controllerAddProduct = async (req, res) => {
  try {
    const product = req.body;
    const productCreated = await Products.create(product);
    res.status(201).json({ msg: "Created", payload: productCreated });
  } catch (error) {
    res.status(400);
    res.json({ msg: error.message });
  }
};

exports.controllerDeleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const productDeleted = await Products.findByIdAndDelete(productId);
    if (productDeleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ msg: `could not find ${productId}` });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.controllerUpdateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = req.body;
    const productUpdated = await Products.findOneAndUpdate(productId, product, {
      new: true,
    });
    res.status(200).json({ msg: "Product Updated", payload: productUpdated });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};
