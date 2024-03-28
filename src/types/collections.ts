
import  {  IUser } from "./user"
import  { IFeedBack } from "./feedBack"

export  type ICollection = {
      id  : string ,
      name : string ,
      usersApllied : number,
      status :string ,
      userId: string ,
      description ? : string,
      user : IUser,
      feedbacks : IFeedBack[],
      appliedEmails : any[],
      updates : [],
      createdAt : string ,
      updatedAt : string 
}

