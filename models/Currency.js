import mongoose from "mongoose";

const CurrencySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  brand: { type: String, require: true },
  country: { type: String, require: true },
  code: { type: String, require: true },
  price: { type: Array, require: true },
});

export default mongoose.model("Currency", CurrencySchema);
