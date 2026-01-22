import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import "./Payment.css";

export default function Payment() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [pendingOrder, setPendingOrder] = useState(null);

  const [method, setMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  useEffect(() => {
    // Get the pending order from checkout
    const order = sessionStorage.getItem("pendingOrder");
    if (order) {
      setPendingOrder(JSON.parse(order));
    }
  }, []);

  const totalAmount = pendingOrder
    ? pendingOrder.total
    : cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handlePay = () => {
    if (method === "upi" && !upiId) {
      alert("Please enter UPI ID");
      return;
    }

    if (
      method === "card" &&
      (!card.number || !card.name || !card.expiry || !card.cvv)
    ) {
      alert("Please fill all card details");
      return;
    }

    // Save the order to localStorage
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    
    if (pendingOrder) {
      pendingOrder.status = "Confirmed";
      pendingOrder.paymentMethod = method;
      allOrders.push(pendingOrder);
    }
    
    localStorage.setItem("orders", JSON.stringify(allOrders));
    
    // Clear the pending order and cart
    sessionStorage.removeItem("pendingOrder");
    clearCart();

    alert("Payment Successful 🎉");
    navigate("/orders");
  };

  return (
    <div className="payment-page">
      <div className="payment-card">
        <h2>Payment</h2>

        <div className="amount">
          Amount Payable: <span>₹{totalAmount}</span>
        </div>

        {/* PAYMENT METHODS */}
        <div className="payment-methods">
          <label>
            <input
              type="radio"
              checked={method === "upi"}
              onChange={() => setMethod("upi")}
            />
            UPI
          </label>

          <label>
            <input
              type="radio"
              checked={method === "card"}
              onChange={() => setMethod("card")}
            />
            Credit / Debit Card
          </label>

          <label>
            <input
              type="radio"
              checked={method === "cod"}
              onChange={() => setMethod("cod")}
            />
            Cash on Delivery
          </label>
        </div>

        {/* UPI */}
        {method === "upi" && (
          <input
            placeholder="Enter UPI ID"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />
        )}

        {/* CARD */}
        {method === "card" && (
          <>
            <input
              placeholder="Card Number"
              value={card.number}
              onChange={(e) =>
                setCard({ ...card, number: e.target.value })
              }
            />
            <input
              placeholder="Card Holder Name"
              value={card.name}
              onChange={(e) =>
                setCard({ ...card, name: e.target.value })
              }
            />
            <div className="card-row">
              <input
                placeholder="MM/YY"
                value={card.expiry}
                onChange={(e) =>
                  setCard({ ...card, expiry: e.target.value })
                }
              />
              <input
                placeholder="CVV"
                type="password"
                value={card.cvv}
                onChange={(e) =>
                  setCard({ ...card, cvv: e.target.value })
                }
              />
            </div>
          </>
        )}

        {/* COD */}
        {method === "cod" && (
          <p className="cod-text">
            Pay cash when your order is delivered 🚚
          </p>
        )}

        <button className="pay-btn" onClick={handlePay}>
          Pay ₹{totalAmount}
        </button>
      </div>
    </div>
  );
}
