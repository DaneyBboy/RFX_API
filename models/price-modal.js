const mongoose = require('mongoose');
const Schema = mongoose.Schema

const priceSchema = new Schema ({
    Srno:{type:String, require:true},
    itemName:{type:String, require:true},
    description:{type:String, require:true},
    quantity:{type:Number, require:true},
    uom:{type:String, require:true},
    unitRate:{type:Number},
    rfxNumber:{type:String, ref: 'rfx', unique: true}
    
})

const Price = mongoose.model('pricebid', priceSchema)

module.exports = Price;
