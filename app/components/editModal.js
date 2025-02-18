"use client";

import { useState, useEffect } from "react";

export default function EditModal({ user, onClose }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [nickname, setnickname] = useState(user.username)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user]);

  async function handleSave() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({ name, email }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      console.log(response.json());
      alert("User updated successfully!");

      //  onClose(); // ✅ Calls `handleUserUpdated` in `UserCard`
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit User</h3>

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