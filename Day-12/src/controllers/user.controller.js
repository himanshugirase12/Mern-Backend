const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")

async function followUserController(req,res){

    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    if(followerUsername === followeeUsername){
        return res.status(400).json({   
            message:"You can't follow yourself."
        })
    }

    const isUserExist = await userModel.findOne({
        username:followeeUsername
    })

    if(!isUserExist){
        return res.status(400).json({
            message:"User not exists"
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        followee:followerUsername,
        follower:followeeUsername
    })

    if(isAlreadyFollowing){
        return res.status(400).json({
            message:`You are already followed ${followeeUsername}`,
            follow : isAlreadyFollowing
        })
    }


    const followRecord  = await followModel.create({
        follower:followerUsername,
        followee:followeeUsername
    })

    res.status(201).json({
        message:`You are now following ${followeeUsername}`,
        follow:followRecord
    })

}


module.exports = {followUserController}
