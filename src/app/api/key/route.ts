import prisma from "../../../../prisma/prisma"
import { IUser } from "@/types/user";

export const GET = async (request: Request, response: Response) => {
    const url = new URL(request.url);
    const userEmail = url.searchParams.get("userEmail");
  
    if (!userEmail) {
      return new Response(JSON.stringify({ error: "User email not found" }), { status: 400 });
    }
  
    console.log({
      email: userEmail
    });
  
    try {
      const user : IUser | any   = await prisma.user.findUnique({
        where: { email: userEmail },
        include: {
          apiKeys: true
        }
      });
  
      if (!user) {
        return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
      };
  
      return new Response(JSON.stringify(user.apiKeys), { status: 200 });
    } catch (err) {
      console.log({
        userApiKeyError: err
      });
      return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
    }
  };
  