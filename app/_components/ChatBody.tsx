"use client";
import { useContext, useEffect, useState } from "react";
import { Avatar } from "./Avatar";
import { SocketContext } from "../_context/socket.context";
import { SendBar } from "./SendBar";

export const ChatBody = ({ initInbox }: any) => {
  const { socket } = useContext<any>(SocketContext);
  const [inbox, setInbox] = useState<any>(initInbox);
  const [message, setMessage] = useState("");
  const handleMessage = async () => {
    if (socket) {
      //@ts-ignore
      await socket.emit("message", message);
    }
    setMessage("");
  };

  useEffect(() => {
    if (socket) {
      socket.on("message", (socketMessage: string) => {
        setInbox([...inbox, socketMessage]);
      });
    }
  }, [inbox, socket]);

  return (
    <>
      <div className="flex flex-col h-full overflow-x-auto mb-4">
        <div className="flex flex-col h-full">
          <div className="grid grid-cols-12 gap-y-2">
            {inbox.map((item, index) => (
              <ChatItem message={item} key={index} />
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
            <div>{message}</div>
          </div>
        </div>
      </div>
    </>
  );
};
