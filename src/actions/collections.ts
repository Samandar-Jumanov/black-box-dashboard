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

        console.log({
            userCollectionFeedBacks : userWithCollections.collections
        })

      });

      return "Added"
    } catch (err) {
      throw new Error("Something went wrong");
    }
  };