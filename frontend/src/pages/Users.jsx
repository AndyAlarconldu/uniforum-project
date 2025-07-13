import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Chat from "./Chat";

const USERS_API = "http://localhost:8030/students"; // user-service
const FOLLOW_API = "http://localhost:8013/follow";  // follow-service

const Users = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [followingIds, setFollowingIds] = useState([]);
  const [selectedReceiver, setSelectedReceiver] = useState(null); // Nuevo estado para el chat

  const fetchUsers = async () => {
    try {
      const res = await fetch(USERS_API);
      const data = await res.json();
      setUsers(data.filter(u => u.id_student !== user.id)); // Excluye al usuario actual
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const fetchFollowing = async () => {
    try {
      const res = await fetch(`${FOLLOW_API}/following/${user.id}`);
      const data = await res.json();
      if (!Array.isArray(data)) {
        console.error("Expected array but got:", data);
        return;
      }
      const ids = data.map(f => f.followee_id);
      setFollowingIds(ids);
    } catch (err) {
      console.error("Error fetching following:", err);
    }
  };

  const follow = async (followee_id) => {
    try {
      const res = await fetch(`${FOLLOW_API}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ follower_id: user.id, followee_id })
      });
      if (res.ok) {
        setFollowingIds([...followingIds, followee_id]);
      }
    } catch (err) {
      console.error("Error following user:", err);
    }
  };

  const unfollow = async (followee_id) => {
    try {
      const res = await fetch(`${FOLLOW_API}/${followee_id}?follower_id=${user.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setFollowingIds(followingIds.filter(id => id !== followee_id));
      }
    } catch (err) {
      console.error("Error unfollowing user:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchFollowing();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">User Directory</h1>

      {users.map(u => (
        <div
          key={u.id_student}
          className="bg-white shadow rounded p-4 mb-3 flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{u.first_name} {u.last_name}</p>
            <p className="text-gray-600">{u.email}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() =>
                followingIds.includes(u.id_student)
                  ? unfollow(u.id_student)
                  : follow(u.id_student)
              }
              className={`px-4 py-1 rounded ${
                followingIds.includes(u.id_student)
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {followingIds.includes(u.id_student) ? "Unfollow" : "Follow"}
            </button>
            <button
              onClick={() => setSelectedReceiver(u)}
              className="px-4 py-1 rounded bg-green-500 text-white hover:bg-green-600"
            >
              Chat
            </button>
          </div>
        </div>
      ))}

      {selectedReceiver && (
        <Chat
          receiver={selectedReceiver}
          onClose={() => setSelectedReceiver(null)}
        />
      )}
    </div>
  );
};

export default Users;
