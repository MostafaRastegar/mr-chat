import { ChatBody } from "@/app/_components/ChatBody";
import getConversationById from "@/app/actions/getConversationById";
import { getCurrentUser } from "@/app/actions/getCurerntUser";
import getMessages from "@/app/actions/getMessages";
import { Empty, message } from "antd";
import axios from "axios";
// import Header from "./components/Header";
// import Body from "./components/Body";
// import FormChat from "./components/Form";

interface IParams {
  conversationId: string;
}
const ChatId = async ({ params }: { params: IParams }) => {
  const conversationId = params.conversationId;
  const conversation = await getConversationById(conversationId);
  const currentUser = await getCurrentUser();

  const messages = await getMessages(conversationId);
  // console.log("messages :>> ", messagesResponse);
  // if (!conversation) {
  //   return (
  //     <div className="lg:pl-80 h-full">
  //       <div className="h-full flex flex-col">
  //         <Empty />
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <ChatBody initInbox={messages || []} currentUser={currentUser} />
      </div>
    </div>
  );
};

export default ChatId;
