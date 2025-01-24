const express = require('express');
const User = require('../models/userdetails-model');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4:uuidv4 } = require('uuid')

router.post('/createuser', async (req,res)=>{

   const userInfo = req.body;   
   const hashpassword = await bcrypt.hash(userInfo.password, 10)
   await User.create({...userInfo,password:hashpassword, id:uuidv4() })
   res.json({message:"User Successfully registered"})
})

router.post('/login', async(req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email:email});
    if(!user){
       return res.status(404).send("Invalid Credentials")
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password)
    if(isPasswordMatched){
      const token =  jwt.sign({email:user.email, name:user.name, role:user.role},"hello-world",{expiresIn:'1h'})
        res.json({token})
    }else{
        res.status(401).json({message:"authentication failed, username or password incorrect"})
    }

})
module.exports = router;