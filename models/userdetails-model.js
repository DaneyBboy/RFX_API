const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    id:{type:String, require:true, unique:true},
    name:{type:String, require:true},
    email:{type:String, require:true, unique:true},
    password:{type:String, require:true},
    role:{type:String, require:true}

})

const User = mongoose.model('user',userSchema)

module.exports = User;