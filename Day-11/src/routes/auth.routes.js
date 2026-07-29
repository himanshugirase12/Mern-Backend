const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
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

    const hash = crypto.createHash("md5").update(password).digest("hex");


    const user=await userModel.create({
        name,email,password:hash
    })  

    const token=jwt.sign(
        {
            id:user._id,
            email:user.email
        },
    process.env.JWT_SECRET)

    res.cookie("jwt_token",token)


    res.status(201).json({
        message:"user registered.",
        user,
        token
    })


})


authRouter.post("/protected",(req,res)=>{
    console.log(req.cookies)

    res.status(201).json({
        message:"this is protected."
    })

})

authRouter.post("/login",async(req,res)=>{

    const {email,password} =  req.body;

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(404).json({
            message:"User not found by this email."
        })
    }
    
    const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex");

    if(!isPasswordMatched){
        return res.status(401).json({
            message:"Invalid password."
        })
    }

    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET)

    res.cookie("jwt_token",token)

    res.status(200).json({
        message:"user logged in",
        user
    })

})

authRouter.get("/get-me", async(req,res)=>{

    const token = req.cookies.jwt_token;

    if(!token){
        return res.status(401).json({
            message:"Token not found"
        })
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    res.json({
        name:user.name,
        email:user.email
    })


})


module.exports=authRouter