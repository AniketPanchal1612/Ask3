import axios from 'axios';
import { ALL_PRODUCTS_SUCCESS,ALL_PRODUCTS_FAIL,CLEAR_ERRORS,ALL_PRODUCTS_REQUEST,PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_FAIL, ADMIN_PRODUCTS_REQUEST, ADMIN_PRODUCTS_SUCCESS, ADMIN_PRODUCTS_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, GET_REVIEW_REQUEST, GET_REVIEW_SUCCESS, GET_REVIEW_FAIL, DELETE_REVIEW_REQUEST} from '../constants/ProductConstant'

export const getProducts =(keyword='',currentPage=1,price,category,rating=0)=> async (dispatch) =>{

    try {
        dispatch({type:ALL_PRODUCTS_REQUEST})
        let link =`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`

        if(category){
        link =`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`

        }

        

        const {data} = await axios.get(link)

        //pull data

        dispatch({
            type:ALL_PRODUCTS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type:ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
        
    }
}


//create new product
export const newProduct = (productData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_PRODUCT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/admin/product/new`, productData, config)

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getProductDetails = (id) => async (dispatch) =>{
    try {
        dispatch({type:PRODUCT_DETAILS_REQUEST})

        //pull data
        const {data} = await axios.get(`/api/v1/product/${id}`)

        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })
        
    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
        
    }
}

export const newReview = (reviewData) => async (dispatch) =>{
    try {
        dispatch({type:NEW_REVIEW_REQUEST})

        const config ={
            headers:{
                'Content-Type': 'application/json'
            }
        }
        //pull data
        const {data} = await axios.put(`/api/v1/review`, reviewData,config)

        dispatch({
            type:NEW_REVIEW_SUCCESS,
            payload: data.success
        })
        
    } catch (error) {
        dispatch({
            type:NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
        
    }
}

//DELETE PRODUCT
export const deleteProduct = (id) => async (dispatch) =>{
    try {
        dispatch({type:DELETE_PRODUCT_REQUEST})

        
        //pull data
        const {data} = await axios.delete(`/api/v1/admin/product/${id}`)

        dispatch({
            type:DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })
        
    } catch (error) {
        dispatch({
            type:DELETE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
        
    }
}

//update product

//create new product
export const updateProduct = (id,productData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PRODUCT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/product/${id}`, productData, config)

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}




export const getAdminProducts = () => async (dispatch) =>{
    try {
        dispatch({type:ADMIN_PRODUCTS_REQUEST})

        //pull data
        const {data} = await axios.get(`/api/v1/admin/products`)

        dispatch({
            type:ADMIN_PRODUCTS_SUCCESS,
            payload: data.products
        })
        
    } catch (error) {
        dispatch({
            type:ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
        
    }
}

//get product review
export const getProductReviews = (id) => async (dispatch) =>{
    try {
        dispatch({type:GET_REVIEW_REQUEST})

        //pull data
        const {data} = await axios.get(`/api/v1/reviews?id=${id}`)

        dispatch({
            type:GET_REVIEW_SUCCESS,
            payload: data.reviews
        })
        
    } catch (error) {
        dispatch({
            type:GET_REVIEW_FAIL,
            payload: error.response.data.message
        })
        
    }
}

//delete product review
export const deleteReviews = (id, productId) => async (dispatch) =>{
    try {
        dispatch({type:DELETE_REVIEW_REQUEST})

        //pull data
        const {data} = await axios.delete(`/api/v1/reviews?id=${id}&productId=${productId}`)

        dispatch({ 
            type:GET_REVIEW_SUCCESS,
            payload: data.success
        })
        
    } catch (error) {
        dispatch({
            type:GET_REVIEW_FAIL,
            payload: error.response.data.message
        })
        
    }
}

//clear errors
export const ClearErrors =()=> async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
}