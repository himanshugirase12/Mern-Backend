const mongoose=require("mongoose");

const dotenv = require("dotenv");
const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "1.1.1.1"
]);

dotenv.config();


function connectDB(){
    mongoose.connect("mongodb+srv://rahul:hU8n2aJPfWkXzFkO@cluster0.zxyjq6h.mongodb.net/day-7")
        .then(() => {
            console.log("Connected to Database.");
        })
}


module.exports=connectDB  