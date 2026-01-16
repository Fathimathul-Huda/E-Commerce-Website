import { useState, useEffect } from "react";

import hero1 from "../assets/Heroimg/hero1.jpg";
import hero2 from "../assets/Heroimg/hero2.jpg";
import hero3 from "../assets/Heroimg/hero3.jpg";
import hero4 from "../assets/Heroimg/hero4.jpg";

const images = [hero1, hero2, hero3, hero4];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="hero">
        <img
          src={images[index]}
          alt="Hero Banner"
          className="hero-image"
        />

        <div className="hero-overlay">
          <h2>Discover Your Natural Glow</h2>
          <p>Premium beauty products for skincare & makeup</p>
          <button className="hero-btn">Shop Now</button>
        </div>


      </section>

      <style>{`
      
        .hero {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
        }

        /* IMAGE ALWAYS FULL SCREEN */
        .hero-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;   /* KEY FIX */
          object-position: center;
        }

        /* DARK OVERLAY FOR READABILITY */
        .hero::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.25);
          z-index: 1;
        }

        /* CONTENT ON TOP */
        .hero-overlay {
          position: absolute;
          z-index: 2;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          color: #fff;
          max-width: 90%;
        }

        .hero-overlay h2 {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 15px;
        }

        .hero-overlay p {
          font-size: 1.2rem;
          margin-bottom: 25px;
          opacity: 0.95;
        }

        .hero-btn {
          padding: 14px 34px;
          font-size: 1rem;
          background-color: #c2185b;
          color: #fff;
          border: none;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .hero-btn:hover {
          background-color: #a0144a;
          transform: scale(1.05);
        }

        /* MOBILE RESPONSIVE */
        @media (max-width: 768px) {
          .hero-overlay h2 {
            font-size: 2.1rem;
          }

          .hero-overlay p {
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
}
