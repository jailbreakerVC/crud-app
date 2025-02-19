"use client";

import { useState, useEffect } from "react";
import CreationModal from "./creationModal";

export default function FloatingButton({ onUserUpdated }) {
  const [isClicked, setIsClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isClicked) {
      setIsModalOpen(true);
    }
  }, [isClicked]);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`fixed bottom-6 right-6 bg-blue-500 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl 
      hover:bg-blue-600`}
      >
        +
      </button>

      {isModalOpen && (
        <CreationModal
          onClose={() => setIsModalOpen(false)}
          onUserUpdated={onUserUpdated}
        />
      )}
    </>
  );
}
