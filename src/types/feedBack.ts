import { ICollection } from "./collections"

  
export type IFeedBack = {
     id : string ,
     userEmail : string ,
     userName : string ,
     description : string ,
     createdAt : string ,
     updatedAt : string 
     collectionId ? : string ,
     collection  ? : ICollection

}

