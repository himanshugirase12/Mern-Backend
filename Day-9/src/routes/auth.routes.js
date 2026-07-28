const express = require("express")
const userModel = require("../models/user.model")
const authRouter = express.Router()

    //  http://localhost:3000/api/auth/register


authRouter.post("/register", async (req,res)=>{

    const {name,email,password} = req.body

    const  isUserAlreadyExist = await  userModel.findOne({email})

    if(isUserAlreadyExist){
        return res.status(409).json({
            message:"With this email, a user account already exists."
        })
    }

    const user=await userModel.create({
        name,email,password
    })  

    res.status(201).json({
        message:"user registered.",
        user
    })


})

module.exports=authRouter