import prisma from "../../prisma/prisma";
import { ApiKey } from "@/types/apiKey";
import { IUser } from "@/types/user";

export const getUserApiKey = async ( userEmail : string ) : Promise<ApiKey[] | null >  =>{
        const user  : IUser | any   = await prisma.user.findUnique({
             where : { email : userEmail },
             include : {
                apiKeys : true 
             }
        });

        console.log(user?.apiKeys)
        return user?.apiKeys    || null 
};


