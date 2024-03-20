
"use client"
import  { useState , useEffect} from "react"


export const BugDetails = ( { params } : any ) =>{
       const bugName = params.bugName
        const [ bugDetails , setBugDetails ] = useState();


       useEffect(() =>{
            ( async function () {
                 //   const res =  await getBugBuyName();
                //  setBugDetails(res)
            })()
       } , )
      




}