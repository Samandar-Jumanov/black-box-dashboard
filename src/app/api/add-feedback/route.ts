import prisma from "../../../../prisma/prisma";
import { compare } from "bcrypt";

type FeedBackBody = {
      userName : string ,
      userEmail : string ,
      description : string 
      loggedEmail : string ,
      password : string ,
      key : string 
}


export const POST = async ( request : Request , response : Response) =>{
    const data  : FeedBackBody  = await request.json();
    const { userEmail , userName ,  description , loggedEmail , password  , key } : FeedBackBody = data;

    if(!userEmail || !userName || !description   || !loggedEmail || !password || !key) {
          throw new Error("Invalid inputs")
    };

    try {

        const user = await prisma.user.findUnique({
              where : { email : loggedEmail},
              include : { apiKeys : true }
        })


        if(!user) {
              throw new Error("Not authorized" )
        };

        const passwordMatch = await compare(password , user.password as string );

        if(!passwordMatch) {
              throw new Error("Invalid user password")
        }
        


        for(let i = 0 ; i < user.apiKeys.length  ; i++){
            if(user.apiKeys[i].key === key) {
           
                const newFeedBack = await prisma.feedBacks.create({
                    data : {
                      userEmail : userEmail,
                      userName :userName,
                      description : description
                    }
              })
      
              const responseData = {
                 userEmail : newFeedBack.userEmail,
                 userName : newFeedBack.userName,
                 description : newFeedBack.description
              }
      
              
              return new Response(JSON.stringify(responseData) , { status : 201})

            }
        }

        return new Response("Invalid key")
       
    }catch( err : any ) {
        console.log({
             error : err 
        })

        throw new Error("Something went wrong ")
    }
    
};


