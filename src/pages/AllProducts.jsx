import React, { useEffect, useState } from 'react'


import { Link } from 'react-router'
import axios from 'axios'

import { toast } from 'react-toastify'
import useUserStore from '../store/userStore'
import useProductStore from '../store/productStore'




function AllProduct(props) {
    const getAllProduct = useProductStore(state => state.getAllProduct)
    const productsa = useProductStore(state => state.products)
    const token = useUserStore(state => state.token)
    const user = useUserStore(state => state.user)
    const deleteProduct = useProductStore(state => state.deleteProduct)
    const getProduct = useProductStore(state => state.getProduct)
    const getCart = useProductStore(state => state.getCart)
    const { product } = props

    const [products, setProducts] = useState(null)


    const fetchProducts = async () => {
        try {

            const fetchproductdata = await getAllProduct(token)
            setProducts(fetchproductdata)
            console.log(products)
        } catch (err) {
            const errMsg = err.response?.data?.err || err.message
            toast.error(errMsg)
            console.log(errMsg)
        }
    }
    console.log('products', products)



    useEffect(() => {
        fetchProducts()
    }, [])


    const hdlDelete = async (id) => {

        try {
            await deleteProduct(id, token)
            toast.success('Delete done')
            // getAllProduct(token)
            fetchProducts(token)
        } catch (err) {
            const errMsg = err.response?.data?.error || err.message
            toast.error(errMsg)
            console.log(err);

        }


    }



    return (
        <div className='container my-4'>
            <h2 className='text-center mb-4 font-bold text-3xl'>Products</h2>

            <div className='row mb-3'>
                <div className='col'>
                    <Link to="/Createproduct"
                        className='btn btn-primary me-1'
                        role="button"
                    >Create Product</Link>
                    <button type="button"
                        className='btn btn-outline-primary'>
                        Refresh</button>
                </div>
                <div className='col'>

                </div>
                <table className='table'>
                    <thead>
                        <tr className=''>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th>rating</th>
                            <th>numReview</th>
                            <th>Price</th>
                            <th>CountInStock</th>
                            <th>CreatedAt</th>
                            <th>UpdatedAt</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products && products.map((product, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{product.id}</td>
                                        <td>{product.title}</td>
                                        <td><img src={product.image} className='w-10' alt="" /></td>
                                        <td>{product.description}</td>
                                        <td>{product.rating}</td>
                                        <td>{product.numReveiw}</td>
                                        <td>{product.price}$</td>
                                        <td>{product.countInStock}</td>
                                        <td>{product.createdAt}</td>
                                        <td>{product.updateAt}</td>


                                        {user?.Role === 'ADMIN' ? <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                                            <p className='btn btn-primary btn-sm me-1'
                                                href=""><Link to='updateproduct' onClick={()=>getProduct(product)}>Edit</Link></p>
                                            <button type="button" onClick={()=>hdlDelete(product.id)} className='btn btn-danger btn-sm'>Delete</button>
                                        </td>
                                            :
                                            <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                                                <a className='btn btn-primary btn-sm me-1'
                                                    onClick={()=>getCart(product)}
                                                    
                                                    
                                                    >Add to cart</a>
                                                <button type="button" className='btn btn-danger btn-sm'>Buy</button>
                                            </td>
                                        }




                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllProduct