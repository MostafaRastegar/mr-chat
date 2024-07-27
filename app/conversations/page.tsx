"use client";
import clsx from "clsx";
import useConversation from "../hooks/useConversation";
const Conversation = () => {
  const { isOpen } = useConversation();
  return (
    <div
      className={clsx("lg:pl-80 h-full lg:block", isOpen ? "block" : "hidden")}
    >
      Select a chat or start new conversation
    </div>
  );
};
export default Conversation;
