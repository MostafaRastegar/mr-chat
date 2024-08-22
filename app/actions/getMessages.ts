import prisma from "@/libs/prismadb";

const getMessages = async (conversationId: string) => {
  try {
    if (!!conversationId) {
      const messages = await prisma.message.findMany({
        where: { conversationId: conversationId },
      });
      return messages;
    }
  } catch (error: any) {
    return [];
  }
};

export default getMessages;
