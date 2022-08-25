import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { MDBDataTable } from 'mdbreact'
import Loader from '../layout/Loader'
import SideBar from './SideBar'
import { ClearErrors, deleteReviews, getProductReviews } from '../../actions/ProductAction'
import { DELETE_REVIEW_RESET } from '../../constants/ProductConstant'


const ProductReviews = () => {
    const [productId, setProductId] = useState('')
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, reviews, error } = useSelector(state => state.productReviews)
    const {isDeleted} = useSelector(state=>state.review)  
    useEffect(() => {
        
        if (isDeleted) {
            alert.success('Review deleted successfully');
            
            dispatch({ type: DELETE_REVIEW_RESET })
        }
        if (error) {
            alert.error(error);
            dispatch(ClearErrors())
        }

        if(productId !==''){
            dispatch(getProductReviews(productId))
        }



    }, [dispatch, alert, error,productId,isDeleted])

    const deleteReviewHandler =(id)=>{
        dispatch(deleteReviews(id, productId))
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(getProductReviews(productId))
    }
    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'Review ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }
        // console.log(products)
        reviews.forEach(review => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                comment: review.comment,
                user: review.name,

                actions:
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={()=> deleteReviewHandler(review._id)} >
                        <i className="fa fa-trash"></i>
                    </button>
            })
        })
        return data;
    }
  return (
    <Fragment>
    <MetaData title={'Product Reviews'} />
    <div className="row">
        <div className="col-12 col-md-2">
            <SideBar />
        </div>

        <div className="col-12 col-md-10">
            <Fragment>
                <div className="row justify-content-center mt-5">
                    <div className="col-5">
                        <form onSubmit={submitHandler}>
                            <div className="form-group">
                                <label htmlFor="productId_field">Enter Product ID</label>
                                <input
                                    type="text"
                                    id="productId_field"
                                    className="form-control"
                                    value={productId}
                                    onChange={(e) => setProductId(e.target.value)}
                                />
                            </div>

                            <button
                                id="search_button"
                                type="submit"
                                className="btn btn-primary btn-block py-2"
                            >
                                SEARCH
                            </button>
                        </ form>
                    </div>

                </div>

                {reviews && reviews.length > 0 ? (
                    <MDBDataTable
                        data={setReviews()}
                        className="px-3"
                        bordered
                        striped
                        hover
                    />
                ) : (
                        <p className="mt-5 text-center">No Reviews.</p>
                    )}


            </Fragment>
        </div>
    </div>

</Fragment>
  )
}

export default ProductReviews
