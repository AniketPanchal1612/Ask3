import axios from 'axios';
import { ALL_ORDERS_FAIL, ALL_ORDERS_REQUEST, ALL_ORDERS_SUCCESS, CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELETE_ORDERS_FAIL, DELETE_ORDERS_REQUEST, DELETE_ORDERS_SUCCESS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, ORDER_DETAIL_FAIL, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS, UPDATE_ORDERS_FAIL, UPDATE_ORDERS_REQUEST, UPDATE_ORDERS_SUCCESS } from '../constants/OrderConstant'
//order bcs of orderreducer
export const createOrder = (order)=>async(dispatch,getState)=>{
    try {
        dispatch({type:CREATE_ORDER_REQUEST})

        const config ={
            headers:{
                'Content-Type':'application/json'
            } 
        }

        const {data} = await axios.post('/api/v1/order/new', order, config)

        dispatch({
            type:CREATE_ORDER_SUCCESS,
            payload : data
        })

    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}


//get currently logged in user orders
export const myOrders = () =>async(dispatch)=>{
    try {
        dispatch({type:MY_ORDERS_REQUEST})

        const {data} = await axios.get('/api/v1/orders/me')

        dispatch({
            type:MY_ORDERS_SUCCESS,
            payload:data.orders
        })
    } catch (error) {
        dispatch({
            type:MY_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}

//get order detail

//get currently logged in user orders
export const getOrderDetails = (id) =>async(dispatch)=>{
    try {
        dispatch({type:ORDER_DETAIL_REQUEST})

        const {data} = await axios.get(`/api/v1/order/${id}`)

        dispatch({
            type:ORDER_DETAIL_SUCCESS,
            payload:data.order
        })
    } catch (error) {
        dispatch({
            type:ORDER_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}

//get all orders admin
export const allOrders = () =>async(dispatch)=>{
    try {
        dispatch({type:ALL_ORDERS_REQUEST})

        const {data} = await axios.get(`/api/v1/admin/orders`)

        dispatch({
            type:ALL_ORDERS_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:ALL_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const updateOrder = (id,orderData)=>async(dispatch,getState)=>{
    try {
        dispatch({type:UPDATE_ORDERS_REQUEST})

        const config ={
            headers:{
                'Content-Type':'application/json'
            } 
        }

        const {data} = await axios.put(`/api/v1/admin/order/${id}`, orderData, config)

        dispatch({
            type:UPDATE_ORDERS_SUCCESS,
            payload : data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteOrder = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_ORDERS_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/order/${id}`)

        dispatch({
            type: DELETE_ORDERS_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const clearErrors =()=>async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
}