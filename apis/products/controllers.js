const Product = require("../../models/Product");
const Products = require("../../models/Product");

exports.fetchProduct = async (productId, next) => {
  try {
    const product = Products.findById(productId);
    if (product) {
      return product;
    } else {
      const error = new Error(`could not find ${productId}`);
      error.status = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

// exports.controllerHelloWorld = (req, res) => {
//   res.send("hello world");
// };

exports.controllerGetProducts = async (req, res, next) => {
  try {
    const products = await Products.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

exports.controllerDeleteProduct = async (req, res, next) => {
  try {
    const productId = req.product._id;
    await Product.findByIdAndDelete(productId);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.controllerUpdateProduct = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const productId = req.product._id;
    const product = req.body;
    const productUpdated = await Products.findOneAndUpdate(productId, product, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ msg: "Product Updated", payload: productUpdated });
  } catch (error) {
    next(error);
  }
};
