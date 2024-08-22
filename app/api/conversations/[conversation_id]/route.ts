import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, isGroup } = body;
    const conversation = await prisma.conversation.create({
      data: { name, isGroup },
    });
    return NextResponse.json(conversation);
  } catch (error: any) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(request: Request, { params }: Params) {
  try {
    const conversation_id = params.conversation_id;
    const conversationUsers = await prisma.conversationUser.findMany({
      where: { id: conversation_id },
    });

    return NextResponse.json(conversationUsers);
  } catch (error: any) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
