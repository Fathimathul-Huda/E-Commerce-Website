import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function Address() {
  const { user } = useContext(AuthContext);

  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    type: "Home",
  });

  // Load user addresses
  useEffect(() => {
    if (!user) return;

    const allAddresses =
      JSON.parse(localStorage.getItem("addresses")) || {};

    setAddresses(allAddresses[user.email] || []);
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD address
  const saveAddress = () => {
    if (!user) return;

    const newAddress = {
      name: user.name,
      ...form,
    };

    const allAddresses =
      JSON.parse(localStorage.getItem("addresses")) || {};

    const updatedAddresses = [
      ...(allAddresses[user.email] || []),
      newAddress,
    ];

    allAddresses[user.email] = updatedAddresses;
    localStorage.setItem("addresses", JSON.stringify(allAddresses));

    setAddresses(updatedAddresses);
    setShowForm(false);

    setForm({
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      type: "Home",
    });
  };

  // DELETE address
  const deleteAddress = (index) => {
    if (!user) return;

    const allAddresses =
      JSON.parse(localStorage.getItem("addresses")) || {};

    const updatedAddresses = addresses.filter(
      (_, i) => i !== index
    );

    allAddresses[user.email] = updatedAddresses;
    localStorage.setItem("addresses", JSON.stringify(allAddresses));

    setAddresses(updatedAddresses);
  };

  if (!user) {
    return <p style={{ padding: "40px" }}>Please login to view addresses</p>;
  }

  return (
    <div style={{ padding: "40px", maxWidth: "700px", margin: "auto" }}>
      <h2>Saved Addresses</h2>

      {addresses.length === 0 && <p>No saved addresses</p>}

      {addresses.map((addr, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px",
            position: "relative",
          }}
        >
          <h4>
            {addr.name} ({addr.type})
          </h4>
          <p>{addr.address}</p>
          <p>
            {addr.city}, {addr.state} - {addr.pincode}
          </p>
          <p>📞 {addr.phone}</p>

          <button
            onClick={() => deleteAddress(index)}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              border: "none",
              background: "transparent",
              color: "#e80071",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Delete
          </button>
        </div>
      ))}

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          style={{
            marginTop: "20px",
            padding: "10px 15px",
            borderRadius: "8px",
            border: "none",
            background: "#e80071",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          + Add New Address
        </button>
      )}

      {showForm && (
        <div
          style={{
            marginTop: "25px",
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Add New Address</h3>

          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
          <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
          <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
          <input name="state" placeholder="State" value={form.state} onChange={handleChange} />
          <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} />

          <select name="type" value={form.type} onChange={handleChange}>
            <option>Home</option>
            <option>Office</option>
          </select>

          <div style={{ marginTop: "15px" }}>
            <button
              onClick={saveAddress}
              style={{
                padding: "8px 15px",
                borderRadius: "6px",
                border: "none",
                background: "#e80071",
                color: "#fff",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              Save Address
            </button>

            <button
              onClick={() => setShowForm(false)}
              style={{
                padding: "8px 15px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
