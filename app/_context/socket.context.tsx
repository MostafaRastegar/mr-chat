"use client";
import { createContext } from "react";
import { io } from "socket.io-client";
const socket = io("http://172.30.106.165:3001");

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
