const app = require('./app')
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary')
//Setting up confing file

if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({path : "server/.env"});  
PORT =process.env.PORT;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


mongoose.connect(process.env.DB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    // useCreateIndex:true
}).then(()=>
app.listen(PORT,()=>{
    console.log(`server started on ${PORT} in ${process.env.NODE_ENV}`)
}))