const express = require("express")
const followUserController = require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middleware")
const userRouter = express.Router();


// POST /api/users/follow/:username
userRouter.post("/follow/:username",identifyUser,followUserController.followUserController)


module.exports = userRouter;