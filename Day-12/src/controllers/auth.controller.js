const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs");

async function registerController(req,res){

    const {username,email,password,bio,profileImage} = req.body;

    // const isUserExistByEmail = await userModel.findOne({email})   

    // if(!isUserExistByEmail){
    //     return res.status(409).json({
    //         message:"user already exist with same email."
    //     })
    // }

    // const isUserExistByUsername = await userModel.findOne({ username })

    // if(!isUserExistByEmail){
    //     return res.status(409).json({
    //         message:"user already exist with same username."
    //     })
    // }

    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(isUserAlreadyExists){
        return res.status(409).json({
            message:"user already exist " + (isUserAlreadyExists.email == email ? "Email already exists" : "Username already exists")
        })
    }


    const hash =await bcrypt.hash(password,10);  

    const user = await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password:hash 
    })

    const token = jwt.sign({
        // user ka data hona chahiye
        // data unique hona chahiye
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token",token);

    res.status(201).json({
        message:"user registered successfully.",
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage  
        },
        token
    })
}

async function loginController(req,res){

    const {username,email,password} = req.body;

    const user = await userModel.findOne({
        $or:[
            {username:username},
            {email:email}
        ]
    })

    if(!user){
        return res.status(409).json({
            message:"User not found."
        })
    }

    

    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        return res.status(401).json({
            message:"password is invalid"
        })
    }

    const token = jwt.sign(
        {id:user._id,username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token",token);

    res.status(201).json({
        message:"User login successfully.",
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })    
}



module.exports={registerController,loginController}