"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function CreationModal({ onClose, onUserUpdated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function createUser() {
    const newUser = {
      name: name,
      username: nickname,
      email: email,
    };

    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    return response.json();
  }

  async function handleSave() {
    if (!name.trim() || !email.trim() || !nickname.trim()) {
      toast.error("All fields are required!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email address!");
      return;
    }

    toast
      .promise(createUser(), {
        loading: "Creating user...",
        success: <b>User created successfully!</b>,
        error: <b>Could not create user.</b>,
      })
      .then(() => {
        onUserUpdated();
        onClose();
      })
      .catch((err) => setError(err.message));
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
          type="text"
          className="input input-bordered w-full"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        {error && <p className="text-red-500">{error}</p>}

        <div className="modal-action">
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-warning" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
