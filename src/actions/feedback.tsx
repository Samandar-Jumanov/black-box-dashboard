"use server"

import prisma from "../../prisma/prisma";

export const getUserAllFeedbacks = async ( userEmail : string ) =>{
    if(!userEmail){
           return "User email is missing "
    }

    try {

        const user = await prisma.user.findUnique({
                where : {
                    email : userEmail
                },include : {
                    feedBacks : true 
                }
        });


        return user?.feedBacks 

    }catch(err : any ){
             console.log(err.message);
            throw new Error("Internal server error")
    }
}