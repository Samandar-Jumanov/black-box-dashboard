"use client";


import EmailForm from "../../../components/EmailCreateForm"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react";

 const CreateEmail =  () =>{
        const router = useRouter();
        const  { data : session } = useSession();

        if(!session) {
                  return <h1>  You dont have an account </h1>
        }

        
      return (
              <EmailForm  userEmail={"iam@gmail.com"}/>
      )
}

export default  CreateEmail