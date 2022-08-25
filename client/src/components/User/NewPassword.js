import React, { Fragment, useEffect, useState } from 'react'

import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { ClearErrors, resetPassword  } from '../../actions/authAction'
//match for id and history for token
const NewPassword = ({history,match}) => {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const alert = useAlert();
    const dispatch = useDispatch()

    // const { user } = useSelector(state => state.auth)
    const { error,success } = useSelector(state => state.forgotPassword)
    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(ClearErrors())
        }
        if (success) {
            alert.success("Password updated successfully")
            history.push('/login')
        }
    }, [dispatch, , error, alert, success,history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData;
        formData.set('password', password);
        formData.set('confirmPassword', confirmPassword);


        dispatch(resetPassword(match.params.token,formData))
    }




  return (
    <Fragment>
        <MetaData title={'New Password Reset'}/>
        <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mt-2 mb-5">New Password</h1>
                        <div className="form-group">
                            <label htmlFor="old_password_field">Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={password}
                                name='password'
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="new_password_field">Confirm Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                value={confirmPassword}
                                name='confirmPassword'
                                onChange={(e)=>setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3">Set Password</button>
                    </form>
                </div>
            </div>
    </Fragment>
  )
}

export default NewPassword
