const mongoose=require("mongoose")
const productSchema=new mongoose.Schema({
    name:{type:String,required:true},
    category:{type:String,required:true},
    price:{type:Number,required:true},
    tags:{type:String,required:true},
    discription:{type:String,}
}, { timestamps: true})
export default mongoose.model("Product",productSchema)