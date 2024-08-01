"use client";
import { SocketContextProvider } from "./_context/socket.context";

export default function RootTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SocketContextProvider>{children}</SocketContextProvider>
    </>
  );
}
