const express = require("express");
const postRouter =express.Router();
const postController = require("../controllers/post.controller")
const multer = require("multer"); 
const upload = multer({ storage:multer.memoryStorage() })
const identifyUser = require("../middlewares/auth.middleware")

postRouter.post("/",upload.single("image"),identifyUser,postController.createPostController);


postRouter.get("/",identifyUser,postController.getPostController);

// Get /api/posts/details/:postId
// return an detail about specific post with the id ,also check whether the post belongs to the user that the request come from

postRouter.get("/details/:postId",identifyUser,postController.getPostDetailsController);

module.exports=postRouter;  