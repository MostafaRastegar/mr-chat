"use client";
import { useContext, useEffect, useState } from "react";
import { Avatar } from "./Avatar";
import { SocketContext } from "../_context/socket.context";
import { SendBar } from "./SendBar";
import { useSession } from "next-auth/react";
import axios from "axios";
import useConversation from "../hooks/useConversation";

export const ChatBody = ({ initInbox, currentUser }: any) => {
  // console.log("initInbox :>> ", initInbox);
  const { socket } = useContext<any>(SocketContext);
  const { conversationId } = useConversation();
  // console.log(" conversationId:>> ", conversationId);
  const [inbox, setInbox] = useState(initInbox);
  const [message, setMessage] = useState("");
  const handleMessage = async () => {
    if (socket) {
      //@ts-ignore
      await socket.emit("message", {
        body: message,
        senderId: currentUser.id,
        conversationId,
      });
    }
    setMessage("");
  };

  const postMessage = async (socketMessage: any) => {
    return await axios.post("/api/messages", {
      body: socketMessage?.body,
      senderId: currentUser.id,
      conversationId,
    });
  };

  useEffect(() => {
    console.log("socket :>> ", socket);
    if (socket) {
      socket.on("receive_message", (socketMessage: string) => {
        // const closeInbox = [...inbox];
        // closeInbox.push(socketMessage);
        console.log("socketMessage :>> ", socketMessage);
        if (currentUser?.id === socketMessage?.senderId) {
          postMessage(socketMessage).then((res) => {
            setInbox((prev) => {
              return [...prev, res.data];
            });
          });
        }
      });
    }
    return () => socket.off("receive_message");
  }, [socket]);

  useEffect(() => {
    console.log("inbox :>> ", inbox);
  }, [inbox]);

  return (
    <>
      <div className="flex flex-col h-full overflow-x-auto mb-4">
        <div className="flex flex-col h-full">
          <div className="grid grid-cols-12 gap-y-2">
            {inbox.map((item, index) => (
              <ChatItem
                message={item}
                key={index}
                me={item?.sender?.email === currentUser?.email}
              />
            ))}
          </div>
        </div>
      </div>
      <SendBar
        handleMessage={handleMessage}
        message={message}
        setMessage={setMessage}
      />
    </>
  );
};

export const ChatItem = ({ message = "", me = true }) => {
  return (
    <>
      <div className="col-start-1 col-end-13 p-3 rounded-lg">
        <div className={"flex items-center " + (!me && "flex-row-reverse")}>
          <Avatar />
          <div
            className={
              "relative text-sm py-2 px-4 shadow rounded-xl " +
              (me ? "bg-white ml-3" : "bg-indigo-100 mr-3")
            }
          >
            <div>{message.body}</div>
          </div>
        </div>
      </div>
    </>
  );
};
