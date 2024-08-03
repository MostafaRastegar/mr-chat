import { ChatBody } from "@/app/_components/ChatBody";
import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import { Empty, message } from "antd";
// import Header from "./components/Header";
// import Body from "./components/Body";
// import FormChat from "./components/Form";

interface IParams {
  chatId: string;
}
const ChatId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.chatId);
  // console.log("conversation :>> ", conversation);
  const messages = await getMessages(params.chatId);
  // console.log("conversation :>> ", conversation);
  console.log("messages :>> ", messages);
  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <Empty />
        </div>
      </div>
    );
  }
  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        {/* <ChatBody initInbox={messages} /> */}
      </div>
    </div>
  );
};

export default ChatId;
