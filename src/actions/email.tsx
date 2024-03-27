"use server"



import prisma from "../../prisma/prisma";



export const deleteEmail = async ( emailId  : string , email : string  ) =>{

      try {
        const user = await prisma.user.findUnique({
            where : {  email : email },
            include : {
                  emails : true 
            }
      })


      if(!user){
             throw new Error("Unauthorized")
      }



      const userCreatedEmails = user.emails;

      const res = await  userCreatedEmails.some((each : any ) => each.id === emailId)
     
      if(!res){
             throw new Error("User doesnt have this email")
      }
      
      await prisma.emails.delete({
         where : { id : emailId}
      })

      return "Deleted"

      }catch(err : any ){
           console.log({
                  error : err 
           })

           return "Something happed "
      }


}