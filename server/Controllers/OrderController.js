const OrderModel = require('../Models/orderModel');
const productModel = require('../Models/productModel');
const ProductModel = require('../Models/productModel')



//Create a new order   => api/v1/order/new
exports.newOrder = async(req,res,next)=>{
    //pullout information
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
     } = req.body;

     const order = await OrderModel.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user : req.user._id
    })

    res.status(200).json({success:true, order})
}



//Get single order    =>/api/v1/order/:id
exports.getSingleOrder = async(req,res,next)=>{

    const order = await OrderModel.findById(req.params.id).populate('user','name email')

    if(!order){
        return res.status(500).json({message:"No Order found with this id"})
    }

    res.status(200).json({success:true,order})
}



//Get Logged in user order    =>/api/v1/order/me
// get all orders only logged in user get

exports.myOrders = async(req,res,next)=>{

    const orders = await OrderModel.find({user:req.user.id})


    res.status(200).json({success:true,orders})
}



// get all orders for ADMIN  => /api/v1/admin/orders/
exports.allOrders = async(req,res,next)=>{

    const orders = await OrderModel.find()

    let totalAmount = 0;
    orders.forEach(order=>{
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success:true,
        totalAmount,
        orders
    })
}

//Update / Process order - ADMIN => api/v1/admin/order/:id
exports.updateOrder = async(req,res,next)=>{
    //find order by id
    const order = await OrderModel.findById(req.params.id)

    if(order.orderStatus === "Delivered"){
        return res.status(400).json({message:"You have already delieverd this order"})
    }
    //get product and quantity
    order.orderItems.forEach(async item =>{
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status,
    order.delieveredAt = Date.now()

    await order.save();

    res.status(200).json({
        success:true,

    })
}
async function updateStock(id,quantity){
    const product = await productModel.findById(id);
    
    product.stock = product.stock-quantity;

    await product.save({validateBeforeSave:false});
}


//Delete order ADMIN   =>/api/v1/admin/order/:id

exports.deleteOrder = async(req,res,next)=>{
    const order = OrderModel.findById(req.params.id)

    if(!order){
        return res.status(404).json({message:"No order found with this id"})
    }
    await order.remove();

    res.status(200).json({success:true,message:"Order deleted successfully"})
}
