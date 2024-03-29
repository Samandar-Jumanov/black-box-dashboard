import  Stripe from "stripe"
import { config } from "dotenv";
config()

export const getPrices = async (  )=>{
       try {

            const stripe  = new Stripe(process.env.STRIPE_KEY || "") 
            const prices = await stripe.prices.list({
                  limit : 3 
            })
     
         return prices.data
       }catch( err : any ) {
               throw new Error("Something went wrong ")
       }
}



