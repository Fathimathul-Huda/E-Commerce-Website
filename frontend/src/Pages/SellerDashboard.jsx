import { useEffect, useState } from "react";
import api from "../axios";

export default function SellerDashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "",
    price: ""
  });

  useEffect(() => {
    api.get("/products").then(res => setProducts(res.data));
  }, []);

  const addProduct = async () => {
    await api.post("/products", form);
    alert("Product added");
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Seller Dashboard</h2>

      {/* Add Product */}
      <div className="bg-white shadow p-4 mb-6">
        <h3 className="font-semibold mb-2">Add Product</h3>
        {Object.keys(form).map(key => (
          <input
            key={key}
            placeholder={key}
            className="border p-2 w-full mb-2"
            onChange={e => setForm({ ...form, [key]: e.target.value })}
          />
        ))}
        <button
          onClick={addProduct}
          className="bg-pink-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* My Products */}
      <h3 className="font-semibold mb-2">My Products</h3>
      {products.map(p => (
        <div key={p._id} className="border p-2 mb-2">
          {p.name} - ₹{p.price}
        </div>
      ))}
    </div>
  );
}
