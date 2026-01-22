import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Products from "./Pages/Products";
import Cart from "./Pages/Cart";
import ProductDetails from "./Pages/ProdectDetails";
import SellerDashboard from "./Pages/SellerDashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import Payment from "./Pages/Payment";
import CategorySlider from "./Components/CategorySlider";
import Wishlist from "./Pages/Wishlist";
import Checkout from "./Pages/Checkout";
import Profile from "./Pages/profile";
import Address from "./Pages/Address";
import Order from "./Pages/Order"
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/category" element={<CategorySlider />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/seller" element={<SellerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/address" element={<Address />} />
        <Route path="/order" element={<Order />} />
        <Route path="/orders" element={<Order />} />
      </Routes>
    </>
  );
}
