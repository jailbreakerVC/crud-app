"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function EditModal({ user, onClose }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [nickname, setNickname] = useState(user.username);
  const router = useRouter();

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setNickname(user.username);
  }, [user]);

  function validateForm() {
    if (!name.trim() || !email.trim() || !nickname.trim()) {
      toast.error("All fields are required!");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address!");
      return false;
    }
    return true;
  }

  async function saveUser() {
    const updatedUser = {
      id: user.id,
      name: name,
      username: nickname,
      email: email,
    };

    const response = await fetch(
      `https://crud-app-lyart-three.vercel.app/api`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(updatedUser),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return response.json();
  }

  async function handleSave() {
    if (!validateForm()) return;

    toast
      .promise(saveUser(), {
        loading: "Saving...",
        success: "User updated successfully!",
        error: "Could not update user.",
      })
      .then(() => {
        router.refresh();
        onClose();
      });
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
          type="text"
          className="input input-bordered w-full"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

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
