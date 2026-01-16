import { useContext } from "react";
import { WishlistContext } from "../Context/WishlistContext";
import "../Pages/Wishlist.css"

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h2 className="wishlist-title">My Wishlist ❤️</h2>
      </div>

      {wishlist.length === 0 ? (
        <p className="wishlist-empty">Your wishlist is empty</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div className="wishlist-card" key={item.id}>
              <img src={item.image} alt={item.name} />
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>

              <button
                className="remove-btn"
                onClick={() => removeFromWishlist(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

