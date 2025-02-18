"use client";

import { use, useState } from "react";
import EditModal from "./editModal";
import { useRouter } from "next/navigation";

export default function Card({ user, index }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const router = useRouter()


  function handleEditClick() {
     setSelectedUser(user);
     setIsModalOpen(true);
   }

   function DeleterUser() {
    fetch("http://localhost:3000/api", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"id": user.id})
    })
    .then((response) => {
      if (!response.ok) {

        throw new Error("Failed to delete item");
      }
      router.refresh()
      return response.json();
    })
    .then((data) => console.log("Item deleted successfully", data))
    .catch((error) => console.error("Error:", error));
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
            <button
              onClick={() => handleEditClick()}
              className="btn btn-info flex-1"
            >
              Edit
            </button>
            <button onClick={()=> DeleterUser()} className="btn btn-error flex-1">Delete</button>
          </div>
        </div>
        {isModalOpen && (
        <EditModal user={selectedUser} onClose={() => setIsModalOpen(false)} />
      )}
      </div>
    </>
  );
}