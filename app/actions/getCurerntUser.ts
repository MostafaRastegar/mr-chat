import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

export const getCurrentUser = async () => {
  try {
    const session = await getSession();
    console.log("session :>> ", session);
    if (!session?.user?.email) {
      return null;
    }
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }
    return currentUser;
  } catch (error: any) {
    return null;
  }
};
