import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function Profile() {
  const { user, login } = useContext(AuthContext);

  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  if (!user) {
    return <p style={{ padding: "40px" }}>Please login to view profile</p>;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    login({
      name: formData.name,
      email: formData.email,
    });
    setEditMode(false);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>
      <h2>My Profile</h2>

      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
        }}
      >
        {!editMode ? (
          <>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <button
              onClick={() => setEditMode(true)}
              style={{
                marginTop: "15px",
                padding: "8px 14px",
                background: "#e80071",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Edit Profile
            </button>
          </>
        ) : (
          <>
            <label>Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <label>Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <div style={{ marginTop: "15px" }}>
              <button
                onClick={saveProfile}
                style={{
                  padding: "8px 14px",
                  background: "#e80071",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                Save
              </button>

              <button
                onClick={() => setEditMode(false)}
                style={{
                  padding: "8px 14px",
                  background: "#ccc",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
