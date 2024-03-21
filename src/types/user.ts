
import { ApiKey } from "./apiKey";

export type IUser = {
     id : string 
     organizationName : string ,
     email : string ,
     createdAt : string ,
     updatedAt : string ,
     apiKeys  : ApiKey[] | any 
};
