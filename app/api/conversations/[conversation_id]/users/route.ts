import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
export async function POST(request: Request, { params }: Params) {
  try {
    const body = await request.json();
    const conversationId = params.conversation_id;
    const { userId } = body;
    const conversationUser = await prisma.conversationUser.create({
      data: { conversationId, userId },
    });
    return NextResponse.json(conversationUser);
  } catch (error: any) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// export async function GET(request: Request, { params }: Params) {
//   try {
//     const id = params.conversation_id;
//     const conversation = await prisma.conversation.findUnique({
//       where: { id },
//     });
//     return NextResponse.json(conversation);
//   } catch (error: any) {
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }
