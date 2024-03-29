import prisma from "../../prisma/prisma";
import { ApiKey } from "@/types/apiKey";
import { IUser } from "@/types/user";

export const getUserApiKey = async ( userEmail : string ) : Promise<ApiKey[] | null >  =>{
          try {
                const user  : IUser | any   = await prisma.user.findUnique({
                        where : { email : userEmail },
                        include : {
                           apiKeys : true 
                        }
                   });
           
                   console.log(user?.apiKeys)
                   return user?.apiKeys    || null 
          }catch( err : any ) {
                    console.log({
                         userActionError : err.message
                    })

                    throw new Error("Internal server error")
          }
};



