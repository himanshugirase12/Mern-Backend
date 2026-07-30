const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imgUrl:{
        type:String,
        require:[true,"img url is required for creating post."]
    },
    user:{
        ref:"users",
        type:mongoose.Schema.Types.ObjectId,
        require:[true,"user id is requires for creating a post"]
    }
})

const postModel = mongoose.model("posts",postSchema);

module.exports=postModel;