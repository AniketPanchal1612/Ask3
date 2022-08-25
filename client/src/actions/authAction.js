import axios from 'axios'
import { ALL_USERS_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, CLEAR_ERRORS, DELETE_USERS_FAIL, DELETE_USERS_REQUEST, DELETE_USERS_SUCCESS, FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, NEW_PASSWORD_FAIL, NEW_PASSWORD_REQUEST, NEW_PASSWORD_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_USERS_FAIL, UPDATE_USERS_REQUEST, UPDATE_USERS_SUCCESS, USER_DETAIL_FAIL, USER_DETAIL_REQUEST, USER_DETAIL_SUCCESS } from '../constants/authConstant'



//LOGIN
export const login =(email,password)=>async(dispatch)=>{
       try {
        dispatch({type:LOGIN_REQUEST})
        const config ={
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/v1/login',{email,password},config)

        dispatch({
            type:LOGIN_SUCCESS,
            payload:data.user
        })
       } catch (error) {
        dispatch({
            type:LOGIN_FAIL,
            payload: error.response.data.mesaage
        })
       }
}


// Register User
export const register=(userData) => async(dispatch)=>{
    try {
        dispatch({type:REGISTER_USER_REQUEST})
        const config ={
            headers:{
                //bcs of avatar picture
                'Content-Type': 'multipart/form-data'
            }
        }
        const {data} = await axios.post('/api/v1/register',userData,config)

        dispatch({
            type:REGISTER_USER_SUCCESS,
            payload:data.user
        })
       } catch (error) {
        dispatch({
            type:REGISTER_USER_FAIL,
            payload: error.response.data.mesaage
        })
       }
}

//Load User
export const loadUser=() => async(dispatch)=>{
    try {
        dispatch({type:LOAD_USER_REQUEST})
        
        const {data} = await axios.get('/api/v1/me')

        dispatch({
            type:LOAD_USER_SUCCESS,
            payload:data.user
        })
       } catch (error) {
        dispatch({
            type:LOAD_USER_FAIL,
            payload: error.response.data.mesaage
        })
       }
}


// Update User
export const updateProfile=(userData) => async(dispatch)=>{
    try {
        dispatch({type:UPDATE_PROFILE_REQUEST})
        const config ={
            headers:{
                //bcs of avatar picture
                'Content-Type': 'multipart/form-data'
            }
        }
        const {data} = await axios.put('/api/v1/me/update',userData,config)

        dispatch({
            type:UPDATE_PROFILE_SUCCESS,
            //success from authcontroller
            payload:data.success
        })
       } catch (error) {
        dispatch({
            type:UPDATE_PROFILE_FAIL,
            payload: error.response.data.mesaage
        })
       }
}



// Update Paassword
export const updatePassword=(passwords) => async(dispatch)=>{
    try {
        dispatch({type:UPDATE_PASSWORD_REQUEST})
        const config ={
            headers:{
                //bcs of avatar picture
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.put('/api/v1/password/update',passwords,config)

        dispatch({
            type:UPDATE_PASSWORD_SUCCESS,
            //success from authcontroller
            payload:data.success
        })
       } catch (error) {
        dispatch({
            type:UPDATE_PASSWORD_FAIL,
            payload: error.response.data.mesaage
        })
       }
}



// Forgot Paassword
export const forgotPassword=(email) => async(dispatch)=>{
    try {
        dispatch({type:FORGOT_PASSWORD_REQUEST})
        const config ={
            headers:{
                //bcs of avatar picture
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/v1/password/forgot',email,config)

        dispatch({
            type:FORGOT_PASSWORD_SUCCESS,
            //success from authcontroller
            payload:data.message
        })
       } catch (error) {
        dispatch({
            type:FORGOT_PASSWORD_FAIL,
            payload: error.response.data.mesaage
        })
       }
}




// Reser Paassword
export const resetPassword=(token,passwords) => async(dispatch)=>{
    try {
        dispatch({type:NEW_PASSWORD_REQUEST})
        const config ={
            headers:{
                //bcs of avatar picture
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.put(`/api/v1/password/reset/${token}`,passwords,config)

        dispatch({
            type:NEW_PASSWORD_SUCCESS,
            //success from authcontroller
            payload:data.success
        })
       } catch (error) {
        dispatch({
            type:NEW_PASSWORD_FAIL,
            payload: error.response.data.mesaage
        })
       }
}


//Logout
export const logout=() => async(dispatch)=>{
    try {
        
        const {data} = await axios.get('/api/v1/logout')

        dispatch({
            type:LOGOUT_SUCCESS,
        })
       } catch (error) {
        dispatch({
            type:LOGOUT_FAIL,
            payload: error.response.data.mesaage
        })
       }
}


//get all users
export const allUsers=() => async(dispatch)=>{
    try {
        dispatch({type:ALL_USERS_REQUEST})
        
        const {data} = await axios.get('/api/v1/admin/users')

        dispatch({
            type:ALL_USERS_SUCCESS,
            payload:data.users
        })
       } catch (error) {
        dispatch({
            type:ALL_USERS_FAIL,
            payload: error.response.data.mesaage
        })
       }
}


// update user ->admin
export const updateUser=(id,userData) => async(dispatch)=>{
    try {
        dispatch({type:UPDATE_USERS_REQUEST})
        const config ={
            headers:{
                //bcs of avatar picture
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.put(`/api/v1/admin/user/${id}`,userData,config)

        dispatch({
            type:UPDATE_USERS_SUCCESS,
            //success from authcontroller
            payload:data.success
        })
       } catch (error) {
        dispatch({
            type:UPDATE_USERS_FAIL,
            payload: error.response.data.mesaage
        })
       }
}


// getUserDetail -> admin
export const getUserDetails=(id) => async(dispatch)=>{
    try {
        dispatch({type:USER_DETAIL_REQUEST})
        const config ={
            headers:{
                //bcs of avatar picture
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.get(`/api/v1/admin/user/${id}`)

        dispatch({
            type:USER_DETAIL_SUCCESS,
            //success from authcontroller
            payload:data.user
        })
       } catch (error) {
        dispatch({
            type:USER_DETAIL_FAIL,
            payload: error.response.data.mesaage
        })
       }
}


// delete user admin
export const deleteUser=(id) => async(dispatch)=>{
    try {
        dispatch({type:DELETE_USERS_REQUEST})
        
        const {data} = await axios.delete(`/api/v1/admin/user/${id}`)

        dispatch({
            type:DELETE_USERS_SUCCESS,
            //success from authcontroller
            payload:data.success
        })
       } catch (error) {
        dispatch({
            type:DELETE_USERS_FAIL,
            payload: error.response.data.mesaage
        })
       }
}




//clear errors
export const ClearErrors =()=> async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
}