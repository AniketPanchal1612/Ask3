const express = require('express');
const app = express();
const cookieParser= require('cookie-parser')
const errorMiddleware = require('./middlewares/errors')
const bodyparser = require('body-parser')
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv')
const path = require('path')
 
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({path : "server/.env"});  

// dotenv.config({path : "server/.env"});

app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(cookieParser())
app.use(fileUpload());

//setting cloudinary configuration

//import all routes
const product = require('./Routes/ProductRoute')
const auth = require('./Routes/AuthRoute')
const order = require('./Routes/OrderRoute')
const payment = require('./Routes/PaymentRoute')
app.use('/api/v1',product)
app.use('/api/v1',payment)
app.use('/api/v1',auth)
app.use('/api/v1',order)


if(process.env.NODE_ENV==='PRODUCTION'){
    app.use(express.static(path.join(__dirname,'../client/build')))

    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname,'../client/build/index.html'))
    })
}


//Middleware to handle error
app.use(errorMiddleware)


module.exports=app;