import { useCart } from "../Context/CartContext";

export default function ProductCard({
  product,
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
}) {
  const { addToCart } = useCart();
  const inWishlist = isInWishlist(product.id);

  return (
    <>
      <style>{`
        .beauty-card {
          background: #ffffff;
          border-radius: 18px;
          padding: 16px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
          transition: 0.3s;
          max-width: 260px;
          margin: auto;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .beauty-card:hover {
          transform: translateY(-6px);
        }

        .beauty-img-wrapper {
          width: 100%;
          height: 240px;
          overflow: hidden;
          border-radius: 14px;
          margin-bottom: 12px;
        }

        .beauty-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .beauty-name {
          font-size: 15px;
          font-weight: 600;
          color: #333;
          margin-bottom: 6px;
        }

        .beauty-price {
          font-size: 18px;
          font-weight: bold;
          color: #d63384;
          margin-bottom: 12px;
        }

        .beauty-btn {
          width: 100%;
          background: linear-gradient(135deg, #d63384, #ff6aa2);
          color: white;
          border: none;
          padding: 10px;
          border-radius: 24px;
          cursor: pointer;
          font-weight: 600;
        }

        .wishlist-btn {
          position: absolute;
          top: 12px;
          right: 14px;
          background: none;
          border: none;
          font-size: 22px;
          cursor: pointer;
          color: ${inWishlist ? "red" : "#aaa"};
        }
      `}</style>

      <div className="beauty-card">
        {/* ❤️ WISHLIST */}
        <button
          className="wishlist-btn"
          onClick={() =>
            inWishlist
              ? removeFromWishlist(product.id)
              : addToWishlist(product)
          }
        >
          ♥
        </button>

        <div className="beauty-img-wrapper">
          <img
            src={product.image}
            alt={product.name}
            className="beauty-img"
          />
        </div>

        <div className="beauty-name">{product.name}</div>
        <div className="beauty-price">₹{product.price}</div>

        {/* 🛒 ADD TO CART */}
        <button
          className="beauty-btn"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </>
  );
}
