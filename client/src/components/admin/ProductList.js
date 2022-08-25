import React, { Fragment, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { types, useAlert } from 'react-alert'
import axios from 'axios'
import { MDBDataTable } from 'mdbreact'
import Loader from '../layout/Loader'
import SideBar from './SideBar'
import { Link } from 'react-router-dom'
import { getAdminProducts, ClearErrors, deleteProduct } from '../../actions/ProductAction'
import { DELETE_PRODUCT_RESET } from '../../constants/ProductConstant'
const ProductList = ({ history }) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, products, error} = useSelector(state => state.products)
    const {error:deleteError, isDeleted}= useSelector(state=>state.product) 
    console.log(products)



    useEffect(() => {
        dispatch(getAdminProducts())

        if (error) {
            alert.error(error);
            dispatch(ClearErrors())
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(ClearErrors())
        }
        console.log(isDeleted)
        if (isDeleted) {
            alert.success('Product deleted successfully');
            history.push('/admin/products');
            dispatch({ type: DELETE_PRODUCT_RESET })
        }


    }, [dispatch, alert, error, deleteError,isDeleted, history])
    const setProducts = () => {
        const data = {
            columns: [
                // {
                //     label: 'ID',
                //     field: 'id',
                //     sort: 'asc'
                // },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
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
        products.forEach(product => {
            data.rows.push({
                // id: product._id,
                name: product.name,
                price: `$${product.price}`,
                stock: product.stock,
                actions: <Fragment>
                    <Link to={`/admin/product/${product._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={()=>deleteProductHandler(product._id)}>
                        <i className="fa fa-trash" ></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    const deleteProductHandler=(id)=>{
        dispatch(deleteProduct(id))
    }


    return (
        <Fragment>
            <MetaData title={'All Products'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <SideBar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Products</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setProducts()}
                                // className="px-3"
                                bordered
                                striped
                                hover
                                
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default ProductList
