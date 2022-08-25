import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import productDetail from './components/product/productDetail';
import Login from './components/User/Login';
import Register from './components/User/Register';
import store from './store'
import { loadUser } from './actions/authAction';
import { useEffect } from 'react';
import Profile from './components/User/Profile';
import ProtectedRoute from './components/routes/ProtectedRoute';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import NewPassword from './components/User/NewPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import { useState } from 'react';
import axios from 'axios';
import Payment from './components/cart/Payment';
import { useSelector } from 'react-redux';

//payment
import {Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import OrderSuccess from './components/cart/OrderSuccess';

//Order Imports
import ListOrder from './components/orders/ListOrder';
import OrderDetails from './components/orders/OrderDetails';
//Admin Route
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
// import { userReducer } from './reducers/authReducers';
import UpdateProduct from './components/admin/UpdateProduct';
import OrderList from './components/admin/OrderList';
import ProcessOrder from './components/admin/ProcessOrder';
import UserList from './components/admin/UserList';
import UpdateUser from './components/admin/UpdateUser';
import ProductReviews from './components/admin/ProductReviews';

function App() {
  const [stripeApiKey, setStripeApiKey]= useState('')

  useEffect(() => {
    store.dispatch(loadUser())

    async function getStripeApiKey(){
      const {data} = await axios.get('/api/v1/stripeapi')
      setStripeApiKey(data.stripeApiKey)
    }

    getStripeApiKey()
  }, [])

  const {user,loading} = useSelector(state=>state.auth) 


  return (
    <Router>

      <div className="App">
        <Header />
        <div className='container container-fluid'>

          <Route path='/' component={Home} exact />
          <Route path='/search/:keyword' component={Home} />
          <Route path='/product/:id' component={productDetail} exact />
          <Route path='/login' component={Login} exact />
          <Route path='/register' component={Register} exact />
          <Route path='/password/forgot' component={ForgotPassword} exact />
          <Route path='/password/reset/:token' component={NewPassword } exact />
          <Route path='/cart' component={Cart} exact />
          {/* <Route path='/me' component={Profile} exact /> */}
          <ProtectedRoute path='/me' component={Profile} exact />

          {/* <ProtectedRoute path='/order/:id' component={OrderDetails} exact /> */}

          <ProtectedRoute path='/me/update' component={UpdateProfile} exact />
          <ProtectedRoute path='/password/update' component={UpdatePassword} exact />
          <ProtectedRoute path='/shipping' component={Shipping} exact />

          <ProtectedRoute path='/order/confirm' component={ConfirmOrder} exact />
          
          <ProtectedRoute path='/success' component={OrderSuccess} exact />
          <ProtectedRoute path='/orders/me' component={ListOrder} exact />
          
          
          
          
          {stripeApiKey &&
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path='/payment' component={Payment} />
            </Elements>
          }
        </div>
          <ProtectedRoute path='/dashboard' isAdmin={true} component={Dashboard} exact />
          <ProtectedRoute path='/admin/products' isAdmin={true} component={ProductList} exact />
          <ProtectedRoute path='/admin/orders' isAdmin={true} component={OrderList} exact />
          <ProtectedRoute path='/admin/order/:id' isAdmin={true} component={ProcessOrder} exact />
          <ProtectedRoute path='/admin/product' isAdmin={true} component={NewProduct} exact />
          <ProtectedRoute path='/admin/product/:id' isAdmin={true} component={UpdateProduct} exact />
          <ProtectedRoute path='/admin/users' isAdmin={true} component={UserList} exact />
          <ProtectedRoute path='/admin/user/:id' isAdmin={true} component={UpdateUser} exact />
          <ProtectedRoute path='/admin/reviews' isAdmin={true} component={ProductReviews} exact />
          {/* {!loading && user.role !=='admin' &&(
            
          )} */}
          <Footer />
      </div>
    </Router>
  );
}

export default App;
