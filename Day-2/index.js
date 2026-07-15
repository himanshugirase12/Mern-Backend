const express =require("express");
const app=express();

app.get('/',(req,res)=>{
    res.send("This is home page");
})

app.get('/about',(req,res)=>{
    res.send("Welcome to about page");
})


app.listen(3000,()=>{
    console.log("This is Server which run on port 3000");
})