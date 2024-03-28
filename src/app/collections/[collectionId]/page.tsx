
import { getCollection } from "@/actions/collections";
import IssueCard from "@/components/collectionCard";
import { Box } from "@mui/material";

 const Collection =  async ( { params } : any ) =>{
      const collectionId = params.collectionId 
      console.log({
          collectionId : collectionId 
      });


      const result = await  getCollection(collectionId as string)
      console.log({
          result : result 
      })

       return (
        <Box sx ={{ marginTop : "70px"}}>  
        
        {result?.map((each : any ) =>{
               return (
                   <>  
                    <IssueCard issue ={each} />
                    </>
               )
        })}
        
        </Box>
       )
}


export default  Collection