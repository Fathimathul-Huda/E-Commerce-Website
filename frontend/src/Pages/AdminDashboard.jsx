import { useEffect, useState } from "react";
import api from "../axios";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/admin/users").then(res => setUsers(res.data));
    api.get("/orders/all").then(res => setOrders(res.data));
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      {/* Users */}
      <h3 className="font-semibold mt-4">Users</h3>
      {users.map(u => (
        <div key={u._id} className="border p-2 mb-2">
          {u.email} ({u.role})
        </div>
      ))}

      {/* Orders */}
      <h3 className="font-semibold mt-6">Orders</h3>
      {orders.map(o => (
        <div key={o._id} className="border p-2 mb-2">
          Order ₹{o.totalAmount} - {o.status}
        </div>
      ))}
    </div>
  );
}
