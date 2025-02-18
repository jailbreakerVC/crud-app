"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreationModal({ onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setnickname] = useState("")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter()


  async function handleSave() {

     const new_user = {
          name: name,
          username: nickname,
          email: email
     }


    try {
      const response = await fetch(
        `http://localhost:3000/api`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(new_user),
        }
      );

      if (!response.ok) {
          throw new Error("Failed to create user");
        }
        
        const data = await response.json(); // Parse the JSON response
        alert(JSON.stringify(data)); // Log or display the actual data
        router.refresh()
        onClose()
     
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add new user</h3>

        <div className="py-4">
          <label className="block">Name:</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="block mt-3">Email:</label>
          <input
            type="email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <label className="block mt-3">Nickname:</label>
          <input
            type="email"
            className="input input-bordered w-full"
            value={nickname}
            onChange={(e) => setnickname(e.target.value)}
          />


        {error && <p className="text-red-500">{error}</p>}

        <div className="modal-action">
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button className="btn btn-warning" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}