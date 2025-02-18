"use client";

import { use, useState } from "react";
import EditModal from "./editModal";

export default function Card({ user, index }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);


  function handleEditClick() {
     setSelectedUser(user);
     setIsModalOpen(true);
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
            <button className="btn btn-error flex-1">Delete</button>
          </div>
        </div>
        {isModalOpen && (
        <EditModal user={selectedUser} onClose={() => setIsModalOpen(false)} />
      )}
      </div>
    </>
  );
}