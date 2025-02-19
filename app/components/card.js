"use client";

import { useState } from "react";
import EditModal from "./editModal";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Card({ user, index, onUserUpdated }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const router = useRouter();

  function handleEditClick() {
    setSelectedUser(user);
    setIsModalOpen(true);
  }

  async function deleteUser() {
    const deletePromise = fetch("/api", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: user.id }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      onUserUpdated();
      return response.json();
    });

    toast.promise(deletePromise, {
      loading: "Deleting...",
      success: "User deleted successfully!",
      error: "Failed to delete user.",
    });

    try {
      await deletePromise;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      <div className="card bg-base-100 shadow-xl p-4">
        <div className="card-body">
          <h2 className="card-title">
            {index + 1}. {user.name}
          </h2>
          <h3 className="italic">aka {user.username}</h3>
          <p>{user.email}</p>
          <div className="flex flex-row gap-4 mt-4">
            <button onClick={handleEditClick} className="btn btn-info flex-1">
              Edit
            </button>
            <button onClick={deleteUser} className="btn btn-error flex-1">
              Delete
            </button>
          </div>
        </div>
        {isModalOpen && (
          <EditModal
            user={selectedUser}
            onClose={() => setIsModalOpen(false)}
            onUserUpdated={onUserUpdated}
          />
        )}
      </div>
    </>
  );
}
