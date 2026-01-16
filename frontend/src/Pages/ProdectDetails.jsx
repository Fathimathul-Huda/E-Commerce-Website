import { useParams } from "react-router-dom";
import Products from "../Pages/Products";

export default function ProductDetails() {
  const { id } = useParams();
  const product = Products.find(p => p.id === Number(id));

  if (!product) return <p>Product not found</p>;

  return (
    <div style={{ padding: "40px", display: "flex", gap: "40px" }}>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "350px", borderRadius: "16px" }}
      />

      <div>
        <h2>{product.name}</h2>
        <h3 style={{ color: "#d63384" }}>₹{product.price}</h3>
        <p style={{ marginTop: "16px" }}>
          Premium beauty product with dermatologist-approved ingredients.
        </p>

        <button
          style={{
            marginTop: "20px",
            padding: "12px 30px",
            background: "#d63384",
            color: "#fff",
            border: "none",
            borderRadius: "24px",
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
