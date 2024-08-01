"use client";
import { useState } from "react";
import { ChatBody } from "../_components/ChatBody";
import { SideBar } from "../_components/SideBar";

export default function ChatPage() {
  const initInbox = ["hi", "hi, how are you?"];
  const [room, setRoom] = useState("");

  // const handleJoinRoom = () => {
  //   if (socket) {
  //     //@ts-ignore
  //     socket.emit("joinRoom", room);
  //   }
  // };

  return (
    <>
      {/* component */}
      <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <SideBar />

          <div className="flex flex-col flex-auto h-full p-6">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
              <ChatBody initInbox={initInbox} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
