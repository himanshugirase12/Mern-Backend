const mongoose=require("mongoose");

const dotenv = require("dotenv");
const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "1.1.1.1"
]);

dotenv.config();


function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to Database.");
        })
}


module.exports=connectDB  