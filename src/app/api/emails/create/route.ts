

import prisma from "../../../../../prisma/prisma";

export const POST = async ( request : Request ) =>{

    const { userEmail , collectionName , responseText} = await request.json();

      if(!userEmail || !collectionName ||!responseText ){
          throw new Error("Invalid inputs")
      }

      
    try {
        
        const user = await prisma.user.findUnique({
            where: { email: userEmail },
            include : { collections : true }
        });

        if (!user) {
            throw new Error("User not found");
        }

        const newEmail = await prisma.emails.create({
            data: {
                collectionName: collectionName,
                userEmail: userEmail,
                responseText: responseText,
                userId: user.id, 
            },
        });

        console.log(newEmail);
       
         return new Response(JSON.stringify(newEmail) , { status : 201 })
        
    }catch(err : any ){
           console.log(err)
           return new Response(err.message , { status : 500})
    }
}