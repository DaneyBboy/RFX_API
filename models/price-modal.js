const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    Srno: { type: String, required: true },
    itemName: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required:true },
    uom: { type: String },
    unitRate: { type: Number },
    totalPrice: { type: Number }
});

const priceSchema = new mongoose.Schema({
    rfxNumber:{type:String, required:true},
    items: [itemSchema], // Array of items    
}, {
    timestamps: true
});

priceSchema.index({ rfxNumber: 1, Srno: 1 }, { unique: true }); // Prevent duplicate Srno per rfxNumber

module.exports = mongoose.model('Price', priceSchema);
