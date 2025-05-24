const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    Srno: { type: String, required: true },
    itemName: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number },
    uom: { type: String },
    unitRate: { type: Number },
    totalPrice: { type: Number }
});

const pricesubSchema = new mongoose.Schema({
    rfxNumber: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true }, // Removed unique: true here
    items: [itemSchema]
});

// Compound unique index ensures email is unique within each rfxNumber
pricesubSchema.index({ rfxNumber: 1, email: 1 }, { unique: true });

module.exports = mongoose.model('pricesub', pricesubSchema);