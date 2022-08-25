import { ALL_ORDERS_FAIL, ALL_ORDERS_REQUEST, ALL_ORDERS_SUCCESS, CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELETE_ORDERS_FAIL, DELETE_ORDERS_REQUEST, DELETE_ORDERS_RESET, DELETE_ORDERS_SUCCESS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, ORDER_DETAIL_FAIL, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS, UPDATE_ORDERS_FAIL, UPDATE_ORDERS_REQUEST, UPDATE_ORDERS_RESET, UPDATE_ORDERS_SUCCESS } from '../constants/OrderConstant'
export const newOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}


export const myOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case MY_ORDERS_REQUEST:
            return {
                loading: true
            }
        case MY_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        case MY_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }

}



//orderdetail reducers



export const orderDetailsReducer = (state = { order: {} }, action) => {
    switch (action.type) {
        case ORDER_DETAIL_REQUEST:
            return {
                loading: true
            }
        case ORDER_DETAIL_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case ORDER_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }

}



export const allOrderReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ALL_ORDERS_REQUEST:
            return {
                loading: true
            }
        case ALL_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload.orders,
                //this for amount pass from backend in ordercontrollers
                totalAmount: action.payload.totalAmount,

            }
        case ALL_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }

}


//update
export const orderReducer = (state = {}, action) => {
    switch (action.type) {

        case UPDATE_ORDERS_REQUEST:
        case DELETE_ORDERS_REQUEST:
            return {
                ...state,
                loading: true,
            }



        case UPDATE_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case DELETE_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_ORDERS_FAIL:
        case DELETE_ORDERS_FAIL:
            return {
                ...state,
                error: action.payload
            }


        case UPDATE_ORDERS_RESET:
            return {
                ...state,
                isUpdated: false,
            }
        case DELETE_ORDERS_RESET:
            return {
                ...state,
                isDeleted: false,
            }
        case CLEAR_ERRORS:
            return {
                //return whatever in state
                ...state,
                error: null
            }
        default:
            return state
    }
}