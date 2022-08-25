const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'Please enter product name'],
        trim : true, //remove extra spaces 
    },
    price:{
        type: Number,
        required: [true, 'Please enter product price'],
        default:0.0
    },
    description:{
        type: String,
        required: [true,'Please enter product name'],
    },
    ratings:{
        type: Number,
        default:0,
    },
    images :[
        {
            public_id:{
                type: String,
                required:true,
            },
            url:{
                type: String,
                required:true,
            }

        }
    ],
    category:{
        type: String,
        required:[true,'Please select category for this product'],
        //enum for select category

        enum:{
            values:[
                'Electronics','Mobiles', 'Cameras', 'Laptops','Food','Accessories','Headphones','Books','Clothes','Beauty/Health','Sports','Home'
            ],
            message:'Please select correct category for product'
        }
    },
    seller:{
        type:String, 
        required:[true, 'Please enter product seller']
    },
    stock:{
        type: Number,
        required:[true,'Please enter product stock'],
        default:0
    },
    numOfReviews:{
        type: Number,
        default:0
    },
    reviews:[
        {
            user:{
                type: mongoose.Schema.ObjectId,
                ref:'User',
                required:true
            },
            name:{
                type:String,
                required: true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }

    ],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        // required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

// const ProductModel = mongoose.model('Product',productSchema)
// export default ProductModel 


module.exports = mongoose.model('Product', productSchema )