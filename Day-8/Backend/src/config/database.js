const mongoose= require("mongoose")

function connectToDB(){
    mongoose.connect(MONGO_URI)
}