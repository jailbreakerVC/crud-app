"use client"; // Fetches data after rendering

import { useEffect, useState } from "react";
import Card from "./components/card";
import FloatingButton from "./components/plusButton";
import { Toaster, toast } from "react-hot-toast";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchUsers() {
    const toastId = toast.loading("Loading users...");
    try {
      const response = await fetch(`/api`);
      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      setUsers(data);
      toast.success("Users loaded successfully!", { id: toastId });
    } catch (err) {
      setError(err.message);
      toast.error("Error loading users", { id: toastId });
    } finally {
      setLoading(false);
    }
  }

  async function refetchUsers() {
    try {
      const response = await fetch(`/api`);
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  if (error)
    return (
      <p className="text-red-500 text-center">Error loading users: {error}</p>
    );

  return (
    <div className="p-12">
      <h1 className="text-3xl font-bold mb-6 text-center">CRUD APPLICATION</h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-300 h-40 rounded-lg"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user, index) => (
            <Card
              key={user.id}
              user={user}
              index={index}
              onUserUpdated={refetchUsers}
            />
          ))}
        </div>
      )}

      <div className="fixed bottom-6 right-6">
        <FloatingButton onUserUpdated={refetchUsers} />
      </div>
      <Toaster />
    </div>
  );
}
