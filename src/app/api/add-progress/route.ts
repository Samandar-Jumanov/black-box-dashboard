import prisma from "../../../../prisma/prisma"

export const POST = async (  request : Request) =>{
      
    const data = await request.json()

    const { collectionId ,  email  } : { collectionId : string , email : string } = data ;


    if(!collectionId) {
           throw new Error("Collection id missing")
    }

    try {

        const collection = await prisma.collections.findUnique({
              where : { id : collectionId}
        });

        if(!collection){
              throw new Error("Collection not found")
        }

        const user = await prisma.user.findUnique({
              where : { email : email}
        })

        if(!user) {
              throw new Error("User not found ")
        }

        await prisma.collections.update({
              where : { id : collectionId},
              data : {
                  status : "Added"
              }
        })
            
        return new Response("Added",{ status : 201})

    }catch(err : any ){
          console.log({
             error : err.message 
          })

          throw new Error(err.message)
    }
}