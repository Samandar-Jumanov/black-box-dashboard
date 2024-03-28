"use server";
import prisma from "../../prisma/prisma";

export const addFeedBacks = async (feedBackId: string[], email: string) => {
    try {

      await prisma.$transaction(async (prisma) => {
        const userWithCollections = await prisma.user.findUnique({
          where: { email: email },
          include: {
            collections: true, 
          },
        });
  
        if (!userWithCollections) {
          throw new Error("User not found");
        }
  
      
        for (const collection of userWithCollections.collections) {
          await prisma.collections.update({
            where: {
              id: collection.id,
            },
            data: {
              feedbacks: {
                connect: feedBackId.map((id) => ({ id })),
              },
            },
          });
        }
      });
  
    } catch (err) {
      throw new Error("Something went wrong");
    }
  };