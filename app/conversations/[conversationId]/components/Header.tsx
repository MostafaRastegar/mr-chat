"use client";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { Avatar } from "antd";
import Link from "next/link";
import { useMemo } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    return "Active";
  }, [conversation]);

  return (
    <div className="bg-white w-full flex border-b sm:px-4 py-3 px-3 lg:px-6 justify-between items-center shadow-sm">
      <Link
        className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
        href="/conversations"
      >
        <HiChevronLeft size={32} />
      </Link>
      <Avatar>{otherUser.name}</Avatar>
      <div className="flex flex-col">
        <div>{conversation.name || otherUser.name}</div>
        <div className="text-sm font-light ☐ text-neutral-500">
          {statusText}
        </div>
      </div>
      <HiEllipsisHorizontal
        size={32}
        onClick={() => {}}
        className="text-sky-500 cursor-pointer hover: text-sky-600 transition"
      />
    </div>
  );
};

export default Header;