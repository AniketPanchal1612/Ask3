const express = require('express');
const router = express.Router();
const {getProducts, newProduct,getSingleProduct, updateProduct, deleteProduct, createProductReview, getProductReviews, deleteReview, getAdminProducts} = require('../Controllers/ProductController');

const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth')
// router.route('/products').get(getProducts);

router.get('/products', getProducts)
// router.route('/products').get(isAuthenticatedUser,getProducts)
router.route('/admin/products').get(getAdminProducts);
router.get('/product/:id',getSingleProduct) 

// router.put(isAuthenticatedUser('/admin/product/:id',updateProduct)) 

//if user authenticate then user can delete or update
router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRoles('admin'),newProduct);
router.route('/admin/product/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateProduct)
router.route('/admin/product/:id').delete(isAuthenticatedUser, deleteProduct)

router.route('/review').put(isAuthenticatedUser,createProductReview)  
router.route('/reviews').get(isAuthenticatedUser,getProductReviews)
router.route('/reviews').delete(isAuthenticatedUser,deleteReview)
module.exports = router;  