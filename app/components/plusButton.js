"use client";

import { useState, useEffect } from "react";

export default function FloatingButton() {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (isClicked) {
      const timer = setTimeout(() => setIsClicked(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isClicked]);

  return (
    <button
      onClick={() => setIsClicked(true)}
      className={`fixed bottom-6 right-6 bg-blue-500 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl 
      hover:bg-blue-600 transition duration-300 active:scale-90 focus:outline-none 
      ${isClicked ? "animate-ping" : ""}`}
    >
      +
    </button>
  );
}
