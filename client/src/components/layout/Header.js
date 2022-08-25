import React, { Fragment } from 'react'
// import {Route} from 'react-router-dom'
import { Route, Link } from 'react-router-dom'
import Search from './Search'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import '../../App.css'
import { logout } from '../../actions/authAction'

const Header = () => {
  
  const alert = useAlert();
  const dispatch = useDispatch();

  const{cartItems} = useSelector(state=>state.cart)

  const { user, loading } = useSelector(state => state.auth)
  
  const logoutHandler=()=>{
    dispatch(logout());
    alert.success('Logged out successfully')
  }

  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            {/* <img src="./images/logo.png" /> */}
            <Link to='/'>
              {/* <h2 className='mr-3'>ASK</h2> */}
              <img src="https://raw.githubusercontent.com/ghulamabbas2/shopit/master/frontend/public/images/shopit_logo.png" />
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Route render={({ history }) => <Search history={history} />} />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">

          <Link to='/cart'
            style={{ textDecoration: 'none' }}>

            <span id="cart" className="ml-3">Cart</span>
            <span className="ml-1" id="cart_count">{cartItems.length}</span>
          </Link>
          {user ? (
            <div className='ml-1 dropdown d-inline'>
              <Link to='#' className='btn dropdown-toggle text-white mr-4' type='button' id='dropDownMenuButton' data-toggle="dropdown"
                aria-haspopup='true' area-aria-expanded='false'>
                <figure className='avatar avtar-nav'>
                  <img
                    src={user.avatar && user.avatar.url} alt='User'
                    className='rounded-circle'
                  />
                </figure>
                <span>{user && user.name}</span>
              </Link>

              <div 
              className='dropdown-menu'
                aria-labelledby='dropDownMenuButton'
              >
                {user && user.role === 'admin' &&
                 (<Link className='dropdown-item'
                  to='/dashboard'>
                    Dashboard

                </Link>)}
                <Link className='dropdown-item'
                    to='/orders/me'
                  >Orders

                  </Link>
                <Link className='dropdown-item'
                  to='/me'
                >Profile

                </Link>

                <Link className='dropdown-item text-danger' to='/' onClick={logoutHandler}>
                  Logout
                </Link>
              </div>

            </div>
          ) : !loading &&
          <Link to='/login' className="btn ml-4" id="login_btn">Login</Link >
          }

        </div>
      </nav>
    </Fragment>
  )
}

export default Header
