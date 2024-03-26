import prisma from "../../prisma/prisma"
import { ICollection } from "@/types/collections";


export const createResponseEmail  = 
async ( formData : FormData , email : string ) =>{
      

    const responseText : string  = await formData.get("response") as string 
    const collectionName : string | any   = await formData.get("collection") as string 

    try {

        const user = await prisma.user.findUnique({
              where : {  email : email},
              include :{
                  collections : true 
              }
        });


        const userCollections : ICollection[] | any  = user?.collections;
 
        for(let i = 0 ; i < userCollections?.length ; i++){
                 if(!userCollections[i].name !== collectionName){
                      throw new Error("Invalid collection name")
                 } 
        }


        const newEmail = await prisma.emails.create({
               data : {
                collectionName : collectionName,
                userEmail : email,
                responseText : responseText,
               }
        })
         
           return "Created"
    }catch(err : any ){

        console.log({
            emailCreationError : err.message
        })

        throw new Error(err.message)

    }

}