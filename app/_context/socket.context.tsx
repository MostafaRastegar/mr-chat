"use client";
import { createContext } from "react";
import { io } from "socket.io-client";
const socket = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}`);
console.log("socket :>> ", socket);
export const SocketContext = createContext({});
export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
