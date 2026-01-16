const express=require("express");
const app=express()
const mongoose=require("mongoose")
const port=4000;
const dotenv=require("dotenv");
dotenv.config()
app.use(express.json());
mongoose.connect(process.env.mongourl)
.then(()=>{
    console.log("db connected succesfully")
})
.catch((err)=>{
    console.log("db connected error:",err)
});

app.use("/api/auth", require("./Routes/authRoutes"));
app.use("/api/products", require("./Routes/productRoutes"));
app.use("/api/cart", require("./Routes/CartRoutes"));
app.use("/api/orders", require("./Routes/orderRoutes"));
app.use("/api/categories", require("./Routes/categoryRoutes"));
app.use("/api/brands", require("./Routes/brandRoutes"));
app.use("/api/address", require("./Routes/AddressRoutes"));
app.use("/api/coupons", require("./Routes/couponRoutes"));
app.use("/api/reviews", require("./Routes/ReviewRoutes"));

app.listen(port, ()=>{
    console.log(`server running at ${port}`)
});