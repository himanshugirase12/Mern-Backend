const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{
        type:String,
        unique:[true,"User name already exist,try different username."],
        required:[true,"Username is required."]
    },
    email:{
        type:String,
        unique:[true,"Email already exist,try different email "],
        required:[true,"Email is required."]
    },
    password:{
        type:String,
        required:true
    },
    bio:String,
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/cyaaudt40/default-avatar-profile-icon-of-social-media-user-vector.jpg"
    } 
})

const userModel = mongoose.model("users",userSchema);

module.exports=userModel;