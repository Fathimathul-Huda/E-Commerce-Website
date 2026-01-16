import { useState } from "react";
import api from "../axios";

export default function CouponBox() {
  const [code, setCode] = useState("");

  const applyCoupon = async () => {
    const res = await api.post("/coupons/apply", { code });
    alert(`Coupon applied: ${res.data.discountPercentage}% off`);
  };

  return (
    <div className="mt-4">
      <input
        className="border p-2"
        placeholder="Coupon Code"
        onChange={e => setCode(e.target.value)}
      />
      <button
        onClick={applyCoupon}
        className="ml-2 bg-green-500 text-white px-4 py-2"
      >
        Apply
      </button>
    </div>
  );
}
