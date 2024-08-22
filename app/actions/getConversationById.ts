import { getCurrentUser } from "./getCurerntUser";

const getConversationById = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.email) {
      return null;
    }

    const conversation = (
      await fetch(`/api/conversations/${conversationId}`)
    ).json();
    console.log("conversation :>> ", conversation);
    return conversation;
  } catch (error: any) {
    return null;
  }
};
export default getConversationById;
