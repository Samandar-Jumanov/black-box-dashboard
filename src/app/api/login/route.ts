import prisma from "../../../../prisma/prisma";
import { compare } from "bcrypt";


export const POST = async ( request : Request , response : Response) =>{
      const data = await request.json();
      const { email , password  , key } : { email : string , password : string  , key : string } = data;

      try {

        if(!email || !password || !key ) {
             throw new Error("Invalid inputs")
        }

        const user = await prisma.user.findUnique({
               where  : { email : email},
               include : { apiKeys : true }
        });


        if(!user) {
              throw new Error("User not found")
        };


        const passwordMatch = await compare(password , user.password as string);

        if(!passwordMatch) {
              throw new Error("Wrong password")
        };

        for(let i = 0 ; i < user.apiKeys.length  ; i++){
             
            if(user.apiKeys[i].key === key) {
                return new Response("true" , { status : 201})
            }
        }


        return new Response("Invalid key" , { status : 403})
        

      }catch(err : any ) {
          console.log(err.message)
          throw new Error("Something went wrong")
      }
};




