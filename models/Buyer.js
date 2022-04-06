const mongoose = require("mongoose");

const BuyerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  key: { type: String, require: true },
  balance: { type: Number },
});

module.exports = mongoose.model("Buyer", BuyerSchema);
