import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  sku: { type: String, require: true },
  name: { type: String, require: true },
  gtin: { type: String, require: true },
  ean: { type: String, require: true },
  faceValue: { type: Object, require: true },
  defaultPrice: { type: Object, require: true },
  currencyCode: { type: String, require: true },
  isCurrencyProduct: { type: Boolean, require: true },
  imageUrl: { type: String, require: true },
  active: { type: Boolean, require: true },
  languages: { type: Array, require: true },
  countries: { type: Array, require: true },
  platforms: { type: Array, require: true },
  rating: { type: Number, require: true },
  productType: { type: String, require: true },
  category: { type: Array, require: true },
  lastUpdate: { type: String, require: true },
  brand: { type: String, require: true },
});

export default mongoose.model("Product", ProductSchema);
