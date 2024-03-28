"use server"

import prisma from "../../prisma/prisma";
import nodemailer from "nodemailer"


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




export const sendMail = async ( emailId : string , feedBackId : string , userEmail : string , password  : string   ) =>{
          try {



                 const email = await prisma.emails.findUnique({
                       where : { id : emailId }
                 });


                 const feedBack = await prisma.feedBacks.findUnique({
                       where : { id : feedBackId }
                 });


                 const transporter = nodemailer.createTransport({
                     service: 'gmail',
                     auth: {
                       user: userEmail,
                       pass:  password,
                     },
                   });
                 
                   const mailOptions = {
                     from: process.env.EMAIL_USERNAME,
                     to: feedBack?.userEmail,
                     subject: "Thanks for your feedback",
                     text: email?.responseText,
                   };
 
                   const res =  await transporter.sendMail(mailOptions);
                    return res 
          }catch(err : any ){
                 throw new Error(err.messahe)
          }
} 


