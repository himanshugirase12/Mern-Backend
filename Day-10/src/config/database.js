const mongoose= require("mongoose")

const dotenv = require("dotenv");
const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "1.1.1.1"
]);

dotenv.config();


function connectToDB(){
    mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            console.log("connected to database...")
        })
}

module.exports=connectToDB