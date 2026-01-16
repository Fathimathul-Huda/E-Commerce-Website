import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { AuthContext } from "../Context/AuthContext";
import "./Checkout.css";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // ✅ PLACE ORDER (SAVE TO localStorage)
  const handlePlaceOrder = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const { fullName, phone, street, city, state, pincode } = address;

    if (!fullName || !phone || !street || !city || !state || !pincode) {
      alert("Please fill all address fields");
      return;
    }

    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      id: Date.now(),
      userEmail: user.email,
      items: cartItems,
      total: totalAmount,
      address,
      status: "Placed",
      date: new Date().toLocaleDateString(),
    };

    allOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(allOrders));

    clearCart();
    navigate("/orders");
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* ADDRESS */}
        <div className="checkout-card">
          <h2>Delivery Address</h2>

          <input name="fullName" placeholder="Full Name" onChange={handleChange} />
          <input name="phone" placeholder="Phone Number" onChange={handleChange} />
          <input name="street" placeholder="Street Address" onChange={handleChange} />
          <input name="city" placeholder="City" onChange={handleChange} />
          <input name="state" placeholder="State" onChange={handleChange} />
          <input name="pincode" placeholder="Pincode" onChange={handleChange} />
        </div>

        {/* ORDER SUMMARY */}
        <div className="checkout-card summary">
          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <div key={item.id} className="summary-item">
              <span>{item.name} × {item.qty}</span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}

          <hr />

          <div className="summary-total">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>

          <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
      </div>
    </div>
  );
}
