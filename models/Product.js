const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: String,
    image: String,
    description: String,
    color: String,
    quantity: { type: Number, min: 0, required: true },
    price: { type: Number, default: 3 },
  },
  { timestamps: true }
);

module.exports = model("Product", ProductSchema);
