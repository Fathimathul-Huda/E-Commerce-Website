import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useCart } from "../Context/CartContext";
import { WishlistContext } from "../Context/WishlistContext";
import "../Components/Navbar.css";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useCart();
  const { wishlist } = useContext(WishlistContext);

  const [profileOpen, setProfileOpen] = useState(false);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.qty,
    0
  );

  return (
    <header className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">Glow Beauty</h1>

        <nav className="navbar-links">
          <Link to="/">HOME</Link>
          <Link to="/products">SHOP</Link>

          {/* CATEGORIES */}
          <div className="nav-item mega">
            <span>CATEGORIES</span>
            <div className="mega-menu">
              <div className="mega-column">
                <h4>Skincare</h4>
                <Link to="/products?category=Skincare">Lip Care</Link>
                <Link to="/products?category=Skincare">Eye Care</Link>
                <Link to="/products?category=Skincare">Moisturizers</Link>
              </div>

              <div className="mega-column">
                <h4>Makeup</h4>
                <Link to="/products?category=Makeup">Face</Link>
                <Link to="/products?category=Makeup">Eyes</Link>
                <Link to="/products?category=Makeup">Lips</Link>
              </div>

              <div className="mega-column">
                <h4>Hair Care</h4>
                <Link to="/products?category=Haircare">Shampoo</Link>
                <Link to="/products?category=Haircare">Conditioner</Link>
              </div>

              <div className="mega-column">
                <h4>Body Care</h4>
                <Link to="/products?category=Bodycare">Lotions</Link>
                <Link to="/products?category=Bodycare">Bath</Link>
              </div>
            </div>
          </div>

          {/* BRANDS */}
          <div className="nav-item mega">
            <span>BRANDS</span>
            <div className="mega-menu brand-menu">
              <div className="brand-grid">
                <Link to={`/products?brand=${encodeURIComponent("L'Oréal Paris")}`}>L’Oréal Paris</Link>
                <Link to={`/products?brand=${encodeURIComponent("Dot & Key")}`}>Dot & Key</Link>
                <Link to={`/products?brand=${encodeURIComponent("Plum")}`}>Plum</Link>
                <Link to={`/products?brand=${encodeURIComponent("DermDoc")}`}>DermDoc</Link>
                <Link to={`/products?brand=${encodeURIComponent("Pond’s")}`}>Pond’s</Link>
                <Link to={`/products?brand=${encodeURIComponent("Garnier")}`}>Garnier</Link>
                <Link to={`/products?brand=${encodeURIComponent("Swiss Beauty")}`}>Swiss Beauty</Link>
                <Link to={`/products?brand=${encodeURIComponent("CureSkin")}`}>CureSkin</Link>
              </div>
            </div>
          </div>

          {/* WISHLIST */}
          <Link to="/wishlist" className="cart-link">
            ❤️
            {wishlist.length > 0 && (
              <span className="cart-badge">{wishlist.length}</span>
            )}
          </Link>

          {/* CART */}
          <Link to="/cart" className="cart-link">
            🛒
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>

          {/* AUTH SECTION */}
          {!user ? (
            <Link to="/login">Login</Link>
          ) : (
            <div className="profile-wrapper">
              <div
                className="profile-btn"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <div className="profile-avatar">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span>Profile</span>
              </div>

              {profileOpen && (
                <div className="profile-dropdown">
                  <p className="profile-name">{user.name}</p>
                  <p className="profile-email">{user.email}</p>
                  <p className="profile-role" style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
                    {user.role === "admin" ? "👑 Admin" : user.role === "seller" ? "🏪 Seller" : "🛍️ Buyer"}
                  </p>
                  <hr />

                  {user.role === "admin" && (
                    <>
                      <Link to="/admin" style={{ color: "#d4af37", fontWeight: "bold" }}>
                        ⚙️ Admin Dashboard
                      </Link>
                      <hr />
                    </>
                  )}

                  <Link to="/orders">My Orders</Link>
                  <Link to="/wishlist">Wishlist</Link>
                  <Link to="/address">Saved Addresses</Link>
                  <Link to="/payment">Payment Methods</Link>
                  <Link to="/profile">Edit Profile</Link>

                  <hr />
                  <button onClick={logout} className="logout-link">
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
