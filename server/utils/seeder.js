const productModel = require('../Models/productModel')
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const products = require('../data/product.json')
dotenv.config({path : "server/.env"});  


mongoose.connect(process.env.DB_LOCAL_URL,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    // useCreateIndex:true
})

const seedProducts = async()=>{
    try {
        await productModel.deleteMany();
        console.log("Product Deleted")
        await productModel.insertMany(products)
        console.log("Product Added")

        process.exit();
    } catch (error) {
        console.log(error.message)
        process.exit()
    }
}

seedProducts();
//npm run seeder
