"use server";
import prisma from "../../prisma/prisma";

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
  
      
        for (const _ of feedBackId) {
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
        }


      });

      return "Added"
    } catch (err) {
      throw new Error("Something went wrong");
    }
  };


  export const getCollection = async ( collectionId : string ) =>{
        

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