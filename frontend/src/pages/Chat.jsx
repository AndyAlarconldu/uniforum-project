import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import io from "socket.io-client";
import Reactions from "./Reactions"; // Asegúrate de mover esto si no está en pages

const CHAT_API = "http://localhost:8014/messages";
const SOCKET_SERVER = "http://localhost:8014";

const Chat = ({ receiver }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER, {
      query: { user_id: user.id },
    });

    socketRef.current.on("receive_message", (msg) => {
      const relevant =
        (msg.sender_id === user.id && msg.receiver_id === receiver.id_student) ||
        (msg.sender_id === receiver.id_student && msg.receiver_id === user.id);
      if (relevant) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => socketRef.current.disconnect();
  }, [receiver]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `${CHAT_API}?sender_id=${user.id}&receiver_id=${receiver.id_student}`
        );
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };
    fetchMessages();
  }, [receiver]);

  const sendMessage = () => {
    if (text.trim()) {
      socketRef.current.emit("send_message", {
        sender_id: user.id,
        receiver_id: receiver.id_student,
        text,
      });
      setText("");
    }
  };

  return (
    <div className="p-4 border rounded max-w-xl mx-auto">
      <h2 className="font-bold mb-2">Chat with {receiver.first_name}</h2>
      <div className="h-64 overflow-y-auto border p-2 mb-2 bg-gray-100 rounded">
        {messages.map((m, i) => (
          <div
            key={m._id || i}
            className={`mb-2 ${
              m.sender_id === user.id
                ? "text-right text-blue-700"
                : "text-left text-green-700"
            }`}
          >
            <div className="inline-block bg-white rounded px-2 py-1 shadow">
              <span>{m.text}</span>
              {m._id && (
                <Reactions targetId={m._id} targetType="chat" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          className="flex-1 border px-2 py-1 rounded-l"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-1 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
