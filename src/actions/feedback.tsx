import redisClient from "@/utils/connectRedis";
import prisma from "../../prisma/prisma"


// This is used to get all Feedbacks and sort them out based on the collections 

export const getAllFeedBacks = async (  ) =>{

    try {
          
        await prisma.$connect().then(() => {
                console.log("Database connected")
        }).catch((err : any ) => console.log({ databaseConnection : err}))


        const allfeedBacks  = [];

        const feedBacks = await prisma.feedBacks.findMany();

       for(const feed of feedBacks){
           const data = (await redisClient).hGet("feedbacks" , feed.id)
            
            if(!data){
                (await redisClient).hSet("feedbacks" , feed.id , JSON.stringify(feed))
                allfeedBacks.push(feed)
            }

          };

        
        
         return allfeedBacks

    }catch(error : any ){
          console.log(error.message);
          throw new Error("Error when getting feedback")
    }
}




export const getLatest = async () => {
    const data = await getAllFeedBacks();
    
    if (data.length === 0) {
        return { status: "no-data" }; 
    }

    let latestElem = data[data.length - 1];
    
    const lastItem : any  =( await redisClient).get("latest")

    if (latestElem.description !== lastItem) {
       ( await redisClient).set("latest", latestElem.description);
        return { status: "updated", elem: latestElem };
    };

    return { status: "no-updates" };
};


