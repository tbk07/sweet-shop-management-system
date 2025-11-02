const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  discount: Number, // percent
  expires: Date
}, { timestamps: true });

module.exports = mongoose.model('Coupon', couponSchema);