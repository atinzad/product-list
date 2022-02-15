const { Schema, model } = require("mongoose");
URLSlugs = require("mongoose-url-slugs");

const ShopSchema = new Schema(
  {
    name: { type: String, required: true },
    image: String,
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

ShopSchema.plugin(URLSlugs("name"));
module.exports = model("Shop", ShopSchema);
