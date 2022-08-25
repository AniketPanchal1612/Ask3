const ProductModel = require('../Models/productModel')
// const catchAsyncErrors = require('../utils/apiFeatures')
const APIFeatures = require('../utils/apiFeatures')
const cloudinary = require('cloudinary')
// const UserModel = require('../Models/userModel')

//Display all Products =>api/v1/products/keyword=apple
exports.getProducts = async(req,res,next)=>{

    try {
        // return next(new ('My error',400))
        const resPerPage =4
        const productsCount = await ProductModel.countDocuments() // total num of products

                                                 //query=find(), req.query=> keyword=apple,   query = keyword in apifeatures
        const apiFeatures = new APIFeatures(ProductModel.find(),req.query).search().filter().pagination(resPerPage)
        // .pagination(resPerPage)
        
        // let products = await apiFeatures.query;

        // let filteredProductCount = products.length 
        
        
        const products = await apiFeatures.query
        // const products = await ProductModel.find()
        
        //after 2 sec reload content
        setTimeout(()=>{
            res.status(201).json({success:true,productsCount,products,
                // filteredProductCount,
                resPerPage});

        },200)
    } catch (error) {
        res.status(501).json(error) 
    }
}

// Get all products (Admin)  =>   /api/v1/admin/products
exports.getAdminProducts = async (req, res, next) => {

    const products = await ProductModel.find();

    res.status(200).json({
        products
    })

}
//Get Single Product   =>api/v1/product/:id
exports.getSingleProduct= async(req,res,next)=>{
    const id = req.params.id //from paramater
    try {
        const product = await ProductModel.findById(id);
        res.status(200).json({product})
    } catch (error) {
        res.status(404).json({succes:false,mesage:"Product not found"})
            
    }
}

// const UserModel = require('../Models/userModel')
//create new product => api/v1/product/new
exports.newProduct = async(req,res,next)=>{
    //const product = await ProductModel.create(req.body);
    // req.body.user = req.user.id;
    let images =[]
    if(typeof req.body.images ==='string'){
        images.push(req.body.images)
    }else{
        images = req.body.images
    }

    let imagesLinks = [];

    for(let i=0 ; i < images.length ; i++){
        const result = await cloudinary.v2.uploader.upload(images[i],{
            folder:'products'
        })

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }
    req.body.images = imagesLinks
    req.body.user = req.user.id;
    try{
        // console.log(req.body.user)
        const newProduct = new ProductModel(req.body);
        await newProduct.save();
        res.status(201).json({success:true,newProduct});
    }
    catch(error){ 
        console.log(error)
        res.status(500).json(error)
    }
}


//Update a Product => api/v1/product/:id
exports.updateProduct = async(req,res,next)=>{
    let product = await ProductModel.findById(req.params.id);

    if (!product) {
        return res.status(500).json({message:'Product not found'});
    }

    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    if (images !== undefined) {

        // Deleting images associated with the product
        for (let i = 0; i < product.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }

        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'products'
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLinks
    }
    
    product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
}

//Delete a Product => api/v1/admin/product/:id

exports.deleteProduct = async(req,res,next)=>{
    // const id = req.params.id;

    // //delete images from backend
    // for(let i = 0 ; i < product.images.length;i++){
    //     const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    // }
    
    // try {
    //     const product = await ProductModel.findByIdAndDelete(id);
    //     res.status(201).json({
    //         success: true,
    //         message: 'Product is deleted.'
    //     })
    
    // } catch (error) {
    //     res.status(501).json({message:"Product not found",error})
        
    // }
    const product = await ProductModel.findById(req.params.id);

    if (!product) {
        return res.status(500).json({message:'Product not found'});
    }

    // Deleting images associated with the product
    for (let i = 0; i < product.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }

    await product.remove();

    res.status(200).json({
        success: true,
        isDeleted:true,
        message: 'Product is deleted.'
    })

}

//create new review   =? api/v1/revies
exports.createProductReview = async(req,res,next)=>{
    const {rating,comment,productId} = req.body;

    const review = {
        //currently logged in user
        user: req.user._id,
        name : req.user.name,
        rating : Number(rating),
        comment
    }
    
    //find product
    const product= await ProductModel.findById(productId)

    //check product reviewd or not
    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if(isReviewed){
        product.reviews.forEach(review=>{
            if(review.user.toString()===req.user._id.toString()){
                review.comment = comment;
                review.rating = rating 
            }
        })

    }else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length

    }

    //handle rating
    //reduce -> accept multiple value and give one value 
    product.ratings = product.reviews.reduce((acc,item)=>item.rating + acc ,0) / product.reviews.length

    await product.save({validateBeforeSave:false})

    res.status(200).json({
        success:true
    })
}


//Get product reviews   => /api/v1/reviews
exports.getProductReviews = async(req,res,next)=>{

    try {
        
        const product = await ProductModel.findById(req.query.id);
        
        res.status(200).json({
            success:true,
            reviews:product.reviews
        })
    } catch (error) {
        res.status(500).json({message:"Product review id not fount"})
    }     
}

//Delete Product Review    =>api/v1/reviews
exports.deleteReview =async(req,res,next)=>{
    const product = await ProductModel.findById(req.query.productId)
    console.log(product)

    const reviews = product.reviews.filter(review=> review._id.toString() !== req.query.id.toString())
    
    const numOfReviews = reviews.length;

    const ratings = product.ratings = product.reviews.reduce((acc,item)=>item.rating + acc ,0) / product.reviews.length

    await ProductModel.findByIdAndUpdate(req.query.productId,{
        reviews,ratings,numOfReviews
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({success:true})
}
















//export const getproduct  not support bcs of not type= module so use this
// exports.getProducts = (req,res)=>{
//     res.status(200).json({
//         success: true,
//         message : "First Route"
//     })
// }
