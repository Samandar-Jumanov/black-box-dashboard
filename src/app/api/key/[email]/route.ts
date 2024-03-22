import prisma from "../../../../../prisma/prisma"
import { IUser } from "@/types/user";

export const GET =  async (  request : Request , { params } : any ) =>  {
  
  try {
    const userEmail : string = String(params.email);

    if (!userEmail) {
      return new Response("No email provided");
    }

    const user : IUser | any   = await prisma.user.findUnique({
      where: { email : userEmail },
      include : { apiKeys : true }
    });

    return new Response(JSON.stringify(user?.apiKeys) , { status : 200})
  } catch (err: any) {
    console.error({
      error: err,
    });
    return new Response("Something went wrong")
  }
}
  