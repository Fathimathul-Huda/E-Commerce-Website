import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function Orders() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;

    const allOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const userOrders = allOrders.filter(
      (order) => order.userEmail === user.email
    );

    setOrders(userOrders);
  }, [user]);

  if (!user) {
    return <p style={{ padding: "40px" }}>Please login to view orders</p>;
  }

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      <h2>My Orders</h2>

      {orders.length === 0 && <p>No orders found</p>}

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px",
          }}
        >
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Date:</strong> {order.date}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total:</strong> ₹{order.total}</p>

          <hr />

          {order.items.map((item, index) => (
            <p key={index}>
              {item.name} × {item.qty}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
