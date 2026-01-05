const express=require("express");
const app=express()
const mongoose=require("mongoose")
const port=4000;
const dotenv=require("dotenv");
dotenv.config()
mongoose.connect(process.env.mongourl)
.then(()=>{
    console.log("db connected succesfully")
})
.catch((err)=>{
    console.log("db connected error:",err)
});
app.listen(port, ()=>{
    console.log(`server running at ${port}`)
});