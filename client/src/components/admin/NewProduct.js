import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import axios from 'axios'
import SideBar from './SideBar'
import { newProduct, ClearErrors } from '../../actions/ProductAction'
import { NEW_PRODUCT_RESET, NEW_REVIEW_RESET } from '../../constants/ProductConstant'

const NewProduct = ({history}) => {


    const[name,setName] = useState('');
    const[price,setPrice] = useState(0);
    const[description,setDescription] = useState('');
    const[category,setCategory] = useState('');
    const[stock,setStock] = useState(0);
    const[seller,setSeller] = useState('');
    const[images,setImages] = useState([]);
    const[imagesPreview,setImagesPreview] = useState([]);

    const categories = [
        '----','Electronics','Mobiles', 'Cameras', 'Laptops', 'Food', 'Accessories', 'Headphones', 'Books', 'Clothes', 'Beauty/Health', 'Sports', 'Home'
      ]
      const alert = useAlert()
      const dispatch = useDispatch()

      const {loading,error,success} = useSelector(state=>state.newProduct)
      useEffect(() => {
    
        if (error) {
            alert.error(error);
            dispatch(ClearErrors())
        }
        
        if (success) {
            history.push('/admin/products');
            alert.success('Product created successfully');
            dispatch({ type: NEW_PRODUCT_RESET })
        }

    }, [dispatch, alert, error,success,history])
     
    const submitHandler = (e) => {
      e.preventDefault();
      
      const formData = new FormData;
      formData.set('name', name)
      formData.set('price', price)
      formData.set('description', description)
      formData.set('stock', stock)
      formData.set('category', category)
      formData.set('seller', seller)

      images.forEach(image=>{
        formData.append('images',image)
      })


      dispatch(newProduct(formData))
  }


  const onChange = e=>{
    const files = Array.from(e.target.files)

    setImagesPreview([]);
    setImages([]);
    
    files.forEach(file=>{
        const reader = new FileReader();

        reader.onload=()=>{
            if(reader.readyState===2){
                setImagesPreview(oldArray=>[...oldArray,reader.result])
                setImages(oldArray=>[...oldArray,reader.result])
            }
        }
        reader.readAsDataURL(file);
    })

      
  }


  return (
    <Fragment>
            <MetaData title={'New Product'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <SideBar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                    <div className="wrapper my-5"> 
        <form className="shadow-lg" encType='multipart/form-data' onSubmit={submitHandler}>
            <h1 className="mb-4">New Product</h1>

            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />
            </div>

            <div className="form-group">
                <label htmlFor="price_field">Price</label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  value={price}
                  onChange={(e)=>setPrice(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description_field">Description</label>
                <textarea className="form-control" id="description_field" rows="8" value={description} onChange={(e)=>setDescription(e.target.value)} ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="category_field">Category</label>
                <select className="form-control" id="category_field" value={category} onChange={(e)=>setCategory(e.target.value)}>
                    {categories.map(category=>(
                        <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
              </div>
              <div className="form-group">
                <label htmlFor="stock_field">Stock</label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control"
                  value={stock}
                  onChange={(e)=>setStock(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="seller_field">Seller Name</label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  value={seller}
                  onChange={(e)=>setSeller(e.target.value)}
                />
              </div>
              
              <div className='form-group'>
                <label>Images</label>
                
                    <div className='custom-file'>
                        <input
                            type='file'
                            name='product_images'
                            className='custom-file-input'
                            id='customFile'
                            multiple
                            onChange={onChange}
                        />
                        <label className='custom-file-label' htmlFor='customFile'>
                            Choose Images
                        </label>
                    </div>
                        {imagesPreview.map(img =>(
                        
                        <img className='mt-3 mr-2' width='55' height='52' src={img} key={img} alt="Image" />
                        
                        ))}
x
            </div>

  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading?true:false}
            >
              CREATE
            </button>

          </form>
    </div>

                    </Fragment>
                </div>
            </div>

        </Fragment>
  )
}

export default NewProduct
