export default function CategorySlider() {
  const categories = [
    { name: "Skincare", img: "/src/assets/category/skin.jpg" },
    { name: "Makeup", img: "/src/assets/category/makeup.jpg" },
    { name: "Haircare", img: "/src/assets/category/hair.jpg" },
    { name: "Bodycare", img: "/src/assets/category/body.jpg" },
  ];

  return (
    <div style={{ padding: "30px" }}>
      <h3 style={{ marginBottom: "16px", fontSize: "22px" }}>Categories</h3>

      <div style={{ display: "flex", gap: "20px", overflowX: "auto" }}>
        {categories.map((c, i) => (
          <div
            key={i}
            style={{
              minWidth: "140px",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <img
              src={c.img}
              alt={c.name}
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <p style={{ marginTop: "8px", fontWeight: "600" }}>{c.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
