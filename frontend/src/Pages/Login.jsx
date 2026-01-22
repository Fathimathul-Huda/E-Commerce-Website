import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|net|edu)$/;

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!emailRegex.test(email)) {
      setError("Enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Check if admin login
    let role = "user";
    if (email === "admin@admin.com" && password === "admin123") {
      role = "admin";
    }

    // Store user in localStorage for tracking
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = allUsers.find(u => u.email === email);
    if (!existingUser) {
      allUsers.push({ name: email.split("@")[0], email, role });
      localStorage.setItem("users", JSON.stringify(allUsers));
    }

    // ✅ IMPORTANT: Always send OBJECT with role
    login({
      name: email.split("@")[0],
      email: email,
      role: role,
    });

    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="brand-title">Glow Beauty</h1>
        <p className="login-subtitle">Welcome back ✨</p>

        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>


        <p className="login-footer">
          New to Glow Beauty?{" "}
          <span
            className="register-link"
            onClick={() => navigate("/register")}
          >
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
}
