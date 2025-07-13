import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const REACTION_API = "http://localhost:8016/reaction";

const EMOJIS = {
  like: "👍",
  love: "❤️",
  haha: "😂",
};

const Reactions = ({ targetId, targetType }) => {
  const { user } = useAuth();
  const [summary, setSummary] = useState({});
  const [userReaction, setUserReaction] = useState(null);

  const fetchSummary = async () => {
    try {
      const res = await fetch(`${REACTION_API}/${targetId}`);
      const data = await res.json();
      setSummary(data);
    } catch (err) {
      console.error("Error fetching summary:", err);
    }
  };

  const sendReaction = async (reactionType) => {
    try {
      const res = await fetch(`${REACTION_API}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          target_id: targetId,
          target_type: targetType,
          reaction: reactionType,
        }),
      });
      if (res.ok) {
        setUserReaction(reactionType);
        fetchSummary();
      }
    } catch (err) {
      console.error("Error reacting:", err);
    }
  };

  const deleteReaction = async () => {
    try {
      const res = await fetch(
        `${REACTION_API}?user_id=${user.id}&target_id=${targetId}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        setUserReaction(null);
        fetchSummary();
      }
    } catch (err) {
      console.error("Error deleting reaction:", err);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [targetId]);

  return (
    <div className="mt-1 flex gap-2 items-center">
      {Object.entries(EMOJIS).map(([type, emoji]) => (
        <button
          key={type}
          onClick={() =>
            userReaction === type ? deleteReaction() : sendReaction(type)
          }
          className={`text-xl ${
            userReaction === type ? "opacity-100" : "opacity-50"
          } hover:opacity-100 transition`}
        >
          {emoji} {summary[type] || 0}
        </button>
      ))}
    </div>
  );
};

export default Reactions;
