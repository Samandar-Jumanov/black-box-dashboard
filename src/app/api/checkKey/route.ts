import prisma from "../../../../prisma/prisma"



export const GET = async ( request : Request , response : Response) =>{
         try {
             
            const url = new URL(request.url);
            const key : string  =  String(url.searchParams.get("key"));


           if(!key) {
                return new Response("No key provided" , { status : 403})
           }

           const res = await prisma.apiKey.findUnique({
               where : { key : key }
           });

           if(!res) {
              return new Response("No key found, please check your secret key " , { status : 403})
           }

           return new Response(JSON.stringify(true) , { status : 200})

         }catch(err : any ) {
             
            console.log({
                  error : err 
            });


            throw new Error(err.message )
         }
}