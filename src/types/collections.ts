
import  {  IUser } from "./user"
import  { IFeedBack } from "./feedBack"

export  type ICollection = {
      id  : string ,
      name : string ,
      usersApplied : number[],
      status :string ,
      userId: string ,
      description ? : string,
      user : IUser,
      feedbacks : IFeedBack[],
      appliedEmails : [],
      activeCollections  : [],
      updates : [],
      createdAt : string ,
      updatedAt : string 
}

