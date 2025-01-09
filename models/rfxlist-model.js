const mongoose = require('mongoose')
const Schema = mongoose.Schema

const rfxlist = new Schema({
    proposalCriteria:{type:String, require},
    rfxNumber:{type:String, unique:true},
    dateIssued:{type:Date},
    contactPerson:{type:String},
    submissionDate:{type:Date},
    purpose:{type:String},
    projectGoals:{type:String},
    projectSummary:{type:String},
    scopeOfWork:{type:String},
    fileUpload:{type:String}

})

const rfx = mongoose.model('rfx_creates',rfxlist)

module.exports = rfx