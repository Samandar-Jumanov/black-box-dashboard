
import prisma from "../../../../../prisma/prisma"


export const GET = async ( request : Request , { params } : any ) =>{

    const email = await params.userEmail;

    if(!email) {
         return new Response("User email is missing ")
    };

    try {

        const user = await prisma.user.findUnique({
            where : { email : email},
            include : { emails : true }
        })

        const createdEmails = user?.emails;

        return new Response(JSON.stringify(createdEmails) , { status : 200})

    }catch(err : any ) {
          console.log(err.message);
          return new Response(err.message)
    }
}

