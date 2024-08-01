"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");
export default function SocketPage() {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [inbox, setInbox] = useState<any>(["hello", "nice"]);
  const handleMessage = () => {
    socket.emit("message", message, room);
  };

  return (
    <div>
      <div className="flex flex-col gap-5 mt-20 px-10 lg:px-48">
        {/* Showing the messages */}
        <div className="flex flex-col gap-2 border rounded-lg p-10">
          {inbox.map((message: string, index: number) => (
            <div key={index} className="border rounded px-4 py-2">
              Hello
            </div>
          ))}
        </div>
        <div className="flex gap-2 align-center justify-center">
          <input
            type="text"
            name="message"
            onChange={(v) => setMessage(v.target.value)}
            className="flex-1  border rounded px-2 py-1"
          />
          <button className="w-40" onClick={handleMessage}>
            Send message
          </button>
        </div>
        <div className="flex gap-2 align-center justify-center">
          <input
            type="text"
            name="room"
            className="flex-1 border rounded px-2 py-1"
          />
          <button className="w-40">Join Room</button>
        </div>
      </div>
    </div>
  );
}
