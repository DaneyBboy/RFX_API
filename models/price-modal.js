const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
    rfxNumber: { type: String, required: true },
    Srno: { type: String, required: true },
    itemName: String,
    description: String,
    quantity: Number,
    uom: String,
    unitRate: Number,
    totalPrice: Number
}, {
    timestamps: true
});

priceSchema.index({ rfxNumber: 1, Srno: 1 }, { unique: true }); // Prevent duplicate Srno per rfxNumber

module.exports = mongoose.model('Price', priceSchema);
