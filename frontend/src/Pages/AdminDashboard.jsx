import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      return;
    }

    // Load orders
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(allOrders);

    // Load products
    const allProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(allProducts);

    // Load users (for now from localStorage)
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(allUsers);
  }, [user]);

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.stock) {
      alert("Please fill all fields");
      return;
    }

    const allProducts = JSON.parse(localStorage.getItem("products")) || [];
    const product = {
      id: Date.now(),
      ...newProduct,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      approved: true,
      date: new Date().toLocaleDateString()
    };

    allProducts.push(product);
    localStorage.setItem("products", JSON.stringify(allProducts));
    setProducts(allProducts);
    setNewProduct({ name: "", price: "", category: "", stock: "", description: "", image: null });
    setImagePreview(null);
    setShowAddProduct(false);
    alert("Product added successfully!");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const updateProductStock = (productId, newStock) => {
    const allProducts = JSON.parse(localStorage.getItem("products")) || [];
    const updatedProducts = allProducts.map(p =>
      p.id === productId ? { ...p, stock: parseInt(newStock) } : p
    );
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
  };

  const getOrderStats = () => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const pendingOrders = orders.filter(o => o.status === "Pending").length;
    const deliveredOrders = orders.filter(o => o.status === "Delivered").length;

    return { totalOrders, totalRevenue, pendingOrders, deliveredOrders };
  };

  const getProductOrderCount = (productName) => {
    return orders.reduce((count, order) => {
      const itemCount = order.items.filter(item => item.name === productName).length;
      return count + itemCount;
    }, 0);
  };

  const stats = getOrderStats();

  if (!user || user.role !== "admin") {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>❌ Unauthorized Access</h2>
        <p>Only admins can access this dashboard.</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* HEADER */}
      <div className="admin-header">
        <h1>👑 Admin Dashboard</h1>
        <p>Welcome, {user.name}</p>
      </div>

      {/* STATS CARDS */}
      <div className="admin-stats">
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-number">{stats.totalOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p className="stat-number">₹{stats.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="stat-card pending">
          <h3>Pending Orders</h3>
          <p className="stat-number">{stats.pendingOrders}</p>
        </div>
        <div className="stat-card delivered">
          <h3>Delivered Orders</h3>
          <p className="stat-number">{stats.deliveredOrders}</p>
        </div>
      </div>

      {/* TABS */}
      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          📊 Overview
        </button>
        <button
          className={`tab-btn ${activeTab === "orders" ? "active" : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          📦 Orders ({stats.totalOrders})
        </button>
        <button
          className={`tab-btn ${activeTab === "products" ? "active" : ""}`}
          onClick={() => setActiveTab("products")}
        >
          🛍️ Products ({products.length})
        </button>
        <button
          className={`tab-btn ${activeTab === "users" ? "active" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          👥 Users
        </button>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === "overview" && (
        <div className="tab-content">
          <h2>📈 Business Overview</h2>
          <div className="overview-grid">
            <div className="overview-card">
              <h3>Top Selling Products</h3>
              <div className="product-list">
                {products
                  .sort((a, b) => getProductOrderCount(b.name) - getProductOrderCount(a.name))
                  .slice(0, 5)
                  .map((product) => (
                    <div key={product.id} className="product-item">
                      <span>{product.name}</span>
                      <span className="badge">{getProductOrderCount(product.name)} orders</span>
                    </div>
                  ))}
              </div>
            </div>
            <div className="overview-card">
              <h3>Recent Orders</h3>
              <div className="recent-orders">
                {orders.slice(-5).reverse().map((order) => (
                  <div key={order.id} className="recent-item">
                    <p><strong>{order.userEmail}</strong></p>
                    <p>₹{order.total} • {order.status}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ORDERS TAB */}
      {activeTab === "orders" && (
        <div className="tab-content">
          <h2>📦 All Orders</h2>
          <div className="orders-container">
            {orders.length === 0 ? (
              <p>No orders yet</p>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div>
                      <p><strong>Order #{order.id}</strong></p>
                      <p className="email">{order.userEmail}</p>
                    </div>
                    <div>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className={`status-select status-${order.status.toLowerCase()}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                  <p><strong>Amount:</strong> ₹{order.total} | <strong>Date:</strong> {order.date}</p>
                  <p><strong>Address:</strong> {order.address.street}, {order.address.city}, {order.address.state}</p>
                  <div className="order-items">
                    {order.items.map((item, idx) => (
                      <p key={idx}>• {item.name} × {item.qty}</p>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* PRODUCTS TAB */}
      {activeTab === "products" && (
        <div className="tab-content">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2>🛍️ Products</h2>
            <button
              className="add-btn"
              onClick={() => setShowAddProduct(!showAddProduct)}
            >
              {showAddProduct ? "Cancel" : "+ Add Product"}
            </button>
          </div>

          {showAddProduct && (
            <form onSubmit={handleAddProduct} className="add-product-form">
              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              >
                <option value="">Select Category</option>
                <option value="Skincare">Skincare</option>
                <option value="Makeup">Makeup</option>
                <option value="Haircare">Haircare</option>
                <option value="Bodycare">Bodycare</option>
              </select>
              <input
                type="number"
                placeholder="Stock"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
              />
              <textarea
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold", color: "#333" }}>
                  📸 Upload Product Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    width: "100%",
                    cursor: "pointer"
                  }}
                />
              </div>
              {imagePreview && (
                <div style={{ gridColumn: "1 / -1", textAlign: "center" }}>
                  <p style={{ fontSize: "14px", color: "#666", marginBottom: "10px" }}>Image Preview:</p>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "2px solid #667eea"
                    }}
                  />
                </div>
              )}
              <button type="submit" className="submit-btn">Add Product</button>
            </form>
          )}

          <div className="products-container">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <h3>{product.name}</h3>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Price:</strong> ₹{product.price}</p>
                <p><strong>Orders:</strong> {getProductOrderCount(product.name)}</p>
                <div className="stock-control">
                  <label>Stock:</label>
                  <input
                    type="number"
                    value={product.stock}
                    onChange={(e) => updateProductStock(product.id, e.target.value)}
                  />
                </div>
                <p className="product-status">
                  {product.stock > 0 ? "✅ In Stock" : "❌ Out of Stock"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* USERS TAB */}
      {activeTab === "users" && (
        <div className="tab-content">
          <h2>👥 Users</h2>
          <div className="users-container">
            {users.length === 0 ? (
              <p>No users data available</p>
            ) : (
              users.map((u, idx) => (
                <div key={idx} className="user-card">
                  <p><strong>{u.name}</strong></p>
                  <p>{u.email}</p>
                  <p className={`role role-${u.role}`}>{u.role.toUpperCase()}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
