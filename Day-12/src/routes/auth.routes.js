const express =require("express");

const authRouter = express.Router();

authRouter.post("/register", async(req,res)=>{

    const {username,email,password,bio,profileImage} = req.body;



})