"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://172.30.106.165:3001");

export default function SocketPage() {
  const [socketState, setSocket] = useState();
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [inbox, setInbox] = useState<any>(["hello", "nice"]);
  const handleMessage = () => {
    //@ts-ignore
    socket.emit("message", message, room);
  };

  const handleJoinRoom = () => {
    //@ts-ignore
    socket.emit("joinRoom", room);
  };

  useEffect(() => {
    socket.on("message", (message) => {
      setInbox([...inbox, message]);
    });
  }, [inbox]);
  return (
    <div>
      <div className="flex flex-col gap-5 mt-20 px-10 lg:px-48">
        {/* Showing the messages */}
        <div className="flex flex-col gap-2 border rounded-lg p-10">
          {inbox.map((message: string, index: number) => (
            <div key={index} className="border rounded px-4 py-2">
              {message}
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
            onChange={(v) => setRoom(v.target.value)}
            className="flex-1 border rounded px-2 py-1"
          />
          <button className="w-40" onClick={handleJoinRoom}>
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}
