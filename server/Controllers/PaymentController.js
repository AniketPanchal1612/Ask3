// const dotenv = require('dotenv')
// dotenv.config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

//Process stripe payments => /api/v1/payment/process
exports.processPayment = async(req,res,next)=>{
    const paymentIntent = await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency: 'usd',
        description: 'ASK',
        metadata : {integration_check: 'accept_a_payment'}
    }) 

    res.status(200).json({
        success:true,
        //cross check back and front end client_secret
        client_secret : paymentIntent.client_secret
    })
}



//send stripe api key  /api/v1/stripeapi
exports.sendStripeApi = async(req,res,next)=>{
   

    res.status(200).json({
        stripeApiKey : process.env.STRIPE_API_KEY
    })
}