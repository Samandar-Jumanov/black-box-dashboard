
import  {  IUser } from "./user"


export  type ICollection = {
      id  : string ,
      name : string ,
      usersApplied : number[],
      status :string ,
      userId: string ,
      description ? : string,
      user : IUser,
      feedbacks : [],
      appliedEmails : [],
      activeCollections  : [],
      updates : [],
      createdAt : string ,
      updatedAt : string 
}

