import { createClient } from 'redis';


const redisClient = createClient({
    url : process.env.REDIS_URL as string 
})

.on("error"  , ( error : any ) => console.log(error.message))
.connect()
// .then((res : any ) => console.log("Redis connected"))
// .catch((error : any ) => console.log(error.message))



export default  redisClient