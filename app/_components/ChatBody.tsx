import { Avatar } from "./Avatar";

export const ChatBody = () => {
  return (
    <div className="flex flex-col h-full overflow-x-auto mb-4">
      <div className="flex flex-col h-full">
        <div className="grid grid-cols-12 gap-y-2">
          <ChatItem message="salam dada" />
          <ChatItem message="hi" me={false} />
        </div>
      </div>
    </div>
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
