// Assuming the necessary types are defined in these files
import prisma from "../../../../../prisma/prisma";
import { ICollection } from "@/types/collections";
import { IUser } from "@/types/user";

interface CustomError extends Error {
    message: string;
}

export const GET = async (request : Request  , { params } : any ) : Promise<Response> => {
   
    const userEmail = params.email
    
    try {
        const user: IUser | any  = await prisma.user.findUnique({
            where: { email : userEmail },
           include : {
              collections : {
                  include : {
                      feedbacks : true 
                  }
              }
           }            
        });

     if (!user) throw new Error("User not found");

     const  userCollections : ICollection [] = user.collections
     console.log({
         userCollections : userCollections
     });

     
     
     return new Response(JSON.stringify(userCollections) , { status : 200});

    } catch (err: any) {
        const error: CustomError = err;
        console.error({
            collectionGettingError: error.message,
        });
        throw new Error("Something went wrong when getting collections");
    }
};
