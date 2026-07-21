// rahul hU8n2aJPfWkXzFkO
require("dotenv").config
const app=require("./src/app");

const connectDB=require("./src/config/database")

app.listen(3000,()=>{
    console.log("Server runs on port 3000");
})
connectDB()