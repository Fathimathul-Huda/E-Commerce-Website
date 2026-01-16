import { useSearchParams } from "react-router-dom";
import { useContext } from "react";
import ProductCard from "../Components/ProductCard";
import { WishlistContext } from "../Context/WishlistContext";

/* ================= IMAGES ================= */
import p1 from "../assets/product/skin1.jpg";
import p2 from "../assets/product/skin2.jpg";
import p3 from "../assets/product/skin3.jpg";
import p4 from "../assets/product/skin4.jpg";
import p5 from "../assets/Category/eye1.jpg";
import p6 from "../assets/Category/eye2.jpg";
import p7 from "../assets/Category/eye3.jpg";
import p8 from "../assets/Category/eye4.jpg";
import p9 from "../assets/Category/eye5.jpg";
import p10 from "../assets/Category/eye6.webp";
import p11 from "../assets/Category/face1.webp";
import p12 from "../assets/Category/face2.webp";
import p13 from "../assets/Category/face3.webp";
import p14 from "../assets/Category/face4.webp";
import p15 from "../assets/Category/lip1.webp";
import p16 from "../assets/Category/lip2.webp";
import p17 from "../assets/Category/lip3.webp";
import p18 from "../assets/Category/lip4.webp";
import p19 from "../assets/Category/lip5.webp";
import p20 from "../assets/Category/lip6.webp";
import p21 from "../assets/Category/lip7.webp";
import p22 from "../assets/Category/lip8.webp";
import p23 from "../assets/Category/lip9.webp";
import p24 from "../assets/Category/moist1.webp";
import p25 from "../assets/Category/moist2.webp";
import p26 from "../assets/Category/moist3.webp";
import p27 from "../assets/Category/shamp1.webp";
import p28 from "../assets/Category/shamp2.webp";
import p29 from "../assets/Category/shamp3.webp";
import p30 from "../assets/Category/shamp4.webp";
import p31 from "../assets/Category/shamp5.webp";
import p32 from "../assets/Category/shamp6.webp";

/* ================= ALL PRODUCTS ================= */
const staticProducts = [
  { id: 1, name: "Vitamin C + E Face Serum", brand: "Dot & Key", price: 799, category: "Skincare", image: p1 },
  { id: 2, name: "Light Moisturiser (Non-Oily)", brand: "Pond’s", price: 599, category: "Skincare", image: p2 },
  { id: 3, name: "Aloe Vera Gel", brand: "DermDoc", price: 399, category: "Skincare", image: p3 },
  { id: 4, name: "Anti Acne Face Wash", brand: "Garnier", price: 349, category: "Skincare", image: p4 },

  { id: 5, name: "Niacinamide Serum", brand: "CureSkin", price: 899, category: "Skincare", image: p5 },
  { id: 6, name: "Watermelon Cooling Sunscreen SPF 50 PA+++", brand: "Dot & Key", price: 699, category: "Skincare", image: p6 },
  { id: 7, name: "Coffee Infused Eye Cream", brand: "Swiss Beauty", price: 1299, category: "Skincare", image: p7 },
  { id: 8, name: "Hydra Eye Serum Patch (Coffee)", brand: "Swiss Beauty", price: 899, category: "Skincare", image: p8 },
  { id: 9, name: "Hydra Eye Serum", brand: "Swiss Beauty", price: 799, category: "Skincare", image: p9 },
  { id: 10, name: "Hydra Eye Serum Patch – 60 Pcs", brand: "Swiss Beauty", price: 599, category: "Skincare", image: p10 },

  { id: 11, name: "10% Niacinamide Face Serum", brand: "DermDoc", price: 399, category: "Skincare", image: p11 },
  { id: 12, name: "Anti Acne Face Wash", brand: "Garnier", price: 349, category: "Skincare", image: p12 },
  { id: 13, name: "Cica + Niacinamide De-Tan Face Cream", brand: "Dot & Key", price: 899, category: "Skincare", image: p13 },
  { id: 14, name: "Sunscreen SPF 50 PA+++", brand: "DermDoc", price: 699, category: "Skincare", image: p14 },

  { id: 15, name: "Tinted Lip Balm SPF 50 PA+++", brand: "DermDoc", price: 1299, category: "Makeup", image: p15 },
  { id: 16, name: "Barrier Repair Lip Balm SPF 50+", brand: "Dot & Key", price: 899, category: "Makeup", image: p16 },
  { id: 17, name: "Rosy Soft Red Tint Lip Balm", brand: "NY Bae", price: 799, category: "Makeup", image: p17 },
  { id: 18, name: "Candy Melts Vegan Lip Balm", brand: "Plum", price: 599, category: "Makeup", image: p18 },
  { id: 19, name: "Ceramide Lip Balm SPF 50+", brand: "WishCare", price: 399, category: "Makeup", image: p19 },
  { id: 20, name: "Peach Milk Soft Crème", brand: "Lakmé", price: 349, category: "Skincare", image: p20 },

  { id: 21, name: "Rose Tinted Lip Balm", brand: "Mamaearth", price: 899, category: "Makeup", image: p21 },
  { id: 22, name: "Baby Lips Tinted Lip Balm (Wine)", brand: "Maybelline", price: 699, category: "Makeup", image: p22 },
  { id: 23, name: "Brightening Lip Balm (Caramel)", brand: "Foxtale", price: 1299, category: "Makeup", image: p23 },

  { id: 24, name: "Peach Milk Moisturiser", brand: "Lakmé", price: 899, category: "Skincare", image: p24 },

  { id: 25, name: "Fall Resist 3X Shampoo", brand: "L’Oréal Paris", price: 799, category: "Haircare", image: p25 },
  { id: 26, name: "Total Repair 5 Conditioner", brand: "L’Oréal Paris", price: 599, category: "Haircare", image: p26 },
  { id: 27, name: "Extraordinary Clay Shampoo", brand: "L’Oréal Paris", price: 399, category: "Haircare", image: p27 },
  { id: 28, name: "Keratin Smooth Shampoo", brand: "TRESemmé", price: 349, category: "Haircare", image: p28 },
  { id: 29, name: "Tea Tree & Vetiver Shampoo", brand: "Love Beauty & Planet", price: 899, category: "Haircare", image: p29 },
  { id: 30, name: "Extraordinary Clay Conditioner", brand: "L’Oréal Paris", price: 699, category: "Haircare", image: p30 },
  { id: 31, name: "Fall Resist Conditioner", brand: "L’Oréal Paris", price: 1299, category: "Haircare", image: p31 },
  { id: 32, name: "Anti-Frizz Shampoo", brand: "Love Beauty & Planet", price: 899, category: "Haircare", image: p32 },
];

export default function Products() {
  const [searchParams] = useSearchParams();
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useContext(WishlistContext);

  const categoryParam = searchParams.get("category");
  const brandParam = searchParams.get("brand");

  /* ✅ NORMALIZE FUNCTION */
  const normalize = (str) =>
    str
      ?.replace(/[’]/g, "'")
      .replace(/\s+/g, " ")
      .toLowerCase()
      .trim();

  // ✅ DEFINE VARIABLES (THIS FIXES YOUR ERROR)
  const category = categoryParam ? normalize(categoryParam) : null;
  const brand = brandParam
    ? normalize(decodeURIComponent(brandParam))
    : null;

  const filteredProducts = staticProducts.filter((p) => {
    const categoryMatch = category
      ? normalize(p.category) === category
      : true;

    const brandMatch = brand
      ? normalize(p.brand) === brand
      : true;

    return categoryMatch && brandMatch;
  });

  return (
    <div style={{ padding: "32px" }}>
      <h2 style={{ fontSize: "26px", fontWeight: "700", marginBottom: "24px" }}>
        {brandParam || categoryParam || "All Products"}
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "32px",
          justifyItems: "center",
        }}
      >
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToWishlist={addToWishlist}
            removeFromWishlist={removeFromWishlist}
            isInWishlist={isInWishlist}
          />
        ))}
      </div>
    </div>
  );
}