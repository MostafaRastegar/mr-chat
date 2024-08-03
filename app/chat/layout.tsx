import { useState } from "react";
import { ChatBody } from "../_components/ChatBody";
import { SideBar } from "../_components/SideBar";
import getUsers from "../actions/getUsers";
import getConversations from "../actions/getConversations";
import { Empty } from "antd";

export default async function ChatLayout({ children }) {
  const users = await getUsers();
  const conversations = await getConversations();
  // const [room, setRoom] = useState("");

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
          <SideBar users={users} conversations={conversations} />

          <div className="flex flex-col flex-auto h-full p-6">{children}</div>
        </div>
      </div>
    </>
  );
}
