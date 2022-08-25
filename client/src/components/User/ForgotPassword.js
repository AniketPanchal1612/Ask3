import React, { Fragment, useEffect, useState } from 'react'

import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { ClearErrors, forgotPassword, updateProfile } from '../../actions/authAction'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const alert = useAlert();
    const dispatch = useDispatch()

    // const { user } = useSelector(state => state.auth)
    const { error, message,loading } = useSelector(state => state.forgotPassword)
    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(ClearErrors())
        }
        if (message) {
            alert.success(message)

        

        }



    }, [dispatch, , error, alert, message])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData;
        formData.set('email', email);


        dispatch(forgotPassword(formData))
    }

  return (
    <Fragment>
        <MetaData title={"Forgot Password"} />
        <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">Forgot Password</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Enter Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                name='email'
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading? true:false}>
                            Send Email
                    </button>

                    </form>
                </div>
            </div>
    </Fragment>
  )
}

export default ForgotPassword
