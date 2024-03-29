"use server";
import { IUser } from "@/types/user";
import prisma from "../../prisma/prisma";
import { sendMail } from "./email";

export const addFeedBacksToCollection  = async (feedBackId: string[], email: string  , collectionId : string  ) : Promise<string> => {
    try {

      await prisma.$transaction(async (prisma) => {
        const userWithCollections = await prisma.user.findUnique({
          where: { email: email },
          include: {
            collections: {
                include : {
                     feedbacks : true 
                }
            }, 
          },
        });
  
        if (!userWithCollections) {
          throw new Error("User not found");
        }


        const collection = await prisma.collections.findUnique({
            where : {
                id : collectionId
            },
            include : {
                appliedEmails : true 
            }
        })


        const emailId  : string = await collection?.appliedEmails[0].id as string 
  
      
        for (const feed  of feedBackId) {
          await prisma.collections.update({
            where: {
              id: collectionId
            },
            data: {
              feedbacks: {
                connect: feedBackId.map((id) => ({ id })),
              },
            },
          });

          const res = await sendMail(feed , emailId , "ss" , "ss")

        }

        await prisma.collections.update({
          where: { id: collectionId },
          data: {
            usersApllied: {
              increment: feedBackId.length
            }
          }
        });
        
      });

      return "Added"
    } catch (err) {
      throw new Error("Something went wrong");
    }
  };


  export const getUserCollectionFeedBacks = async ( collectionId : string ) =>{
        

    const collection = await prisma.collections.findUnique({
        where : { id : collectionId },
        include : {
           feedbacks : true 
        }
    });


    console.log({
       collectionFeedBacks : collection?.feedbacks
    })

    return collection?.feedbacks
       
  }


  export const addCollection = async (  userEmail : string , name  : string  ) : Promise<string> =>{
           
       if(!userEmail || !name) throw new Error("Invalid request");

       try {

        const user : IUser | any  = await prisma.user.findUnique({
             where : { email : userEmail}
        })

         await prisma.collections.create({
            data : {
                userEmail : userEmail,
                name : name ,
                userId : user.id
                // user : {
                //     connect : user.id
                // }
            }
        })



          return "Created"

       }catch(err : any ){
           console.log(err.message)
           throw new Error("Internal server error")
       }
  }



  export const deleteCollection = async ( userEmail : string , collectionId : string  ) =>{
       

    if(!userEmail || !collectionId) throw new Error("User not found ")
      try {
            const user  : IUser | any  = await prisma.user.findUnique({
              where : { email : userEmail},
              include : {
                  collections : true
              }
            })


            for( const collection of  user?.collections){
                  if(collection.id !== collectionId){
                          throw new Error("User doesnt have this collection")
                  }  
            }

       await prisma.collections.delete({
           where : { id : collectionId}
       })         



       return "Deleted"
      }catch(err : any ) {
          console.log({
             error : err.message
          })
          throw new Error("Internal server error")
      }

  }