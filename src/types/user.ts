
import { ApiKey } from "./apiKey";
import { ICollection } from "./collections";

export type IUser = {
     id : string 
     organizationName : string ,
     email : string ,
     createdAt : string ,
     updatedAt : string ,
     apiKeys  : ApiKey[] | any 
     collections : ICollection[]
};
