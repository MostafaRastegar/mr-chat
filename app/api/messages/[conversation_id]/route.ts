import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(
  _request: Request,
  { params }: { params: { conversation_id: string } }
) {
  try {
    if (!!params?.conversation_id) {
      const messages = await prisma.message.findMany({
        where: { conversationId: params.conversation_id },
      });
      return NextResponse.json(messages);
    }
  } catch (error: any) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
