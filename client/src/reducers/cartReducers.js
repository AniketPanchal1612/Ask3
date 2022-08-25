import { ADD_TO_CART, REMOVE_ITEM_CART, SAVE_SHIPPING_INFO } from "../constants/cartConstant";

export const cartReducer =(state={cartItems:[],shippingInfo:{} },action)=>{
    switch(action.type){

        case ADD_TO_CART: 
            const item = action.payload
          
            //i.product id of the product
            //check i.product in cart or not

            const isItemExist = state.cartItems.find(i => i.product === item.product)


            
            if(isItemExist){
                return{ 
                    ...state,
                    cartItems: state.cartItems.map(i=>i.product === isItemExist.product?item : i)
                }
            }else{
                return{
                    ...state,
                    cartItems:[...state.cartItems,item]
                }
            }

        case REMOVE_ITEM_CART:
            return{
                ...state,
                //action.payload id of the product
                cartItems:state.cartItems.filter(i=>i.product !==action.payload)
            }
        
            case SAVE_SHIPPING_INFO:{
                return{
                    ...state,
                    shippingInfo: action.payload
                }
            }
        default:
            return state
    }
}