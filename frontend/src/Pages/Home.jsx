import Hero from "../Components/Hero";
import Products from "../Pages/Products";

export default function Home() {
  return (
    <>
      <Hero />
      <Products />
      <button
  onClick={() => {
    localStorage.clear();
    window.location.reload();
  }}
>
  RESET APP
</button>

    </>
  );
}
