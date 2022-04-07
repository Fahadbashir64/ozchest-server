import mongoose from "mongoose";

const CountrySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  brand: { type: String, require: true },
  names: { type: Array, require: true },
});

export default mongoose.model("Country", CountrySchema);
