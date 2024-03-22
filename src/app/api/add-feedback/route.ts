import prisma from "../../../../prisma/prisma";


type FeedBackBody = {
      userName : string ,
      userEmail : string ,
      description : string 
}


export const POST = async ( request : Request , response : Response) =>{
    const data  : FeedBackBody  = await request.json();
    const { userEmail , userName ,  description} : FeedBackBody = data;

    if(!userEmail || !userName || !description) {
          throw new Error("Invalid inputs")
    };

    try {

        const newFeedBack = await prisma.feedBacks.create({
              data : {
                ... data
              }
        })

        return new Response(JSON.stringify(newFeedBack) , { status : 201})
    }catch( err : any ) {
        console.log({
             error : err 
        })

        throw new Error("Something went wrong ")
    }
    
};


