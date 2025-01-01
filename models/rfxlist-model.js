const mongoose = require('mongoose')
const Schema = mongoose.Schema

const rfxlist = new Schema({
    proposalCriteria:{type:String},
    rfxNumber:{type:Number},
    dateIssued:{type:Date},
    contactPerson:{type:String},
    submissionDate:{type:Date},
    purpose:{type:String},
    projectGoals:{type:String},
    projectSummary:{type:String},
    scopeOfWork:{type:String},
    fileName:{type:String}

})

const rfx = mongoose.model('rfx_creates',rfxlist)

module.exports = rfx