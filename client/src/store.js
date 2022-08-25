import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productReviewsReducer, productsReducer, ReviewReducer} from './reducers/productReducers'
import { allUsersReducers, authReducer,forgotPasswordReducer,userDetailsReducer,userReducer } from './reducers/authReducers'
import { cartReducer } from './reducers/cartReducers'
import { allOrderReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from './reducers/orderReducer'

const reducer =combineReducers({
    products: productsReducer,
    productDetails : productDetailsReducer,
    auth:authReducer,
    user:userReducer,
    forgotPassword: forgotPasswordReducer,
    cart:cartReducer,
    newOrder : newOrderReducer,
    myOrders : myOrdersReducer,
    orderDetails : orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct : newProductReducer,
    product: productReducer,
    allUsers: allUsersReducers,
    allOrders: allOrderReducer,
    order: orderReducer,
   userDetails: userDetailsReducer,
   productReviews: productReviewsReducer,
   review: ReviewReducer
})

//Initial state
let initialState = {
    //when page reload all intital value will be stored
    cart:{
        cartItems:localStorage.getItem('cartItems')? 
        JSON.parse(localStorage.getItem('cartItems')): [],
        shippingInfo: localStorage.getItem('shippingInfo')?
        JSON.parse(localStorage.getItem('shippingInfo'))
        :  {}
    }
}

//create middleware we use thunk
const middleware = [thunk]

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store
