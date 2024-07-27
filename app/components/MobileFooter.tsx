"use client";
import useConversation from "@/app/hooks/useConversation";
import { useRoutes } from "@/app/hooks/useRouters";
import MobileItem from "./MobileItem";
const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();
  if (isOpen) {
    return null;
  }
  return (
    <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden">
      <MobileItem
        key={routes.href}
        href={routes.href}
        active={routes.active}
        icon={routes.icon}
        onClick={routes.onClick}
      />
    </div>
  );
};
export default MobileFooter;
