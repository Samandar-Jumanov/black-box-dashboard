import { v4 as uuid } from 'uuid';
import prisma from '../../prisma/prisma';


 const createKey  =  async ( userId : string  , name ? : string  , description ? : string) =>{
      const key = uuid();
      const  secretKey = key.replace(/-/g, '').slice(0, 16);


      const newApiKey =  await prisma.apiKey.create({
          data : {
              name : name ? name :  "Default secret key ",
              description :  description ? description : "This is a default secret key . Please do not share it!",
              key : secretKey,
              user : {
                 connect : {
                      id : userId
                 }
              }
          }
      })

      return  newApiKey.id ? "Success" : "Failed"
      
}

export default createKey
