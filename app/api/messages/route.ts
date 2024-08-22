import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
export async function POST(request: Request) {
  try {
    const requestBody = await request.json();
    const { body, conversationId, senderId } = requestBody;
    const message = await prisma.message.create({
      data: { body, conversationId, senderId },
    });
    return NextResponse.json(message);
  } catch (error: any) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// export async function GET(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const body = request.json();
//     console.log("body :>> ", body);
//     if (!!params?.id) {
//       const messages = await prisma.message.findMany({
//         where: { conversationId: params.id },
//       });
//       return NextResponse.json(messages);
//     }
//   } catch (error: any) {
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }
