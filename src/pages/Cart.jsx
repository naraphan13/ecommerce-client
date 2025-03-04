import React, { useEffect, useState } from 'react'


import { Link } from 'react-router'
import axios from 'axios'

import { toast } from 'react-toastify'
import useUserStore from '../store/userStore'
import useProductStore from '../store/productStore'




function Card(props) {
    const getAllProduct = useProductStore(state => state.getAllProduct)
    const getCart = useProductStore(state => state.getCart)
    const productsa = useProductStore(state => state.products)
    const carts = useProductStore(state => state.carts)
    const cart = useProductStore(state => state.cart)
    const token = useUserStore(state => state.token)
    const user = useUserStore(state => state.user)
    const deleteProduct = useProductStore(state => state.deleteProduct)
    const removeFromCart = useProductStore(state => state.removeFromCart)
    const getProductCart = useProductStore(state => state.getProductCart)
    const createOrder = useProductStore(state => state.createOrder);
    const { product } = props

    const [products, setProducts] = useState(null)

    console.log('cart', cart)
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


    const totalPrice = cart.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);





    return (
        <div className='container my-4'>
            <h2 className='text-center mb-4 font-bold text-3xl'>CART</h2>

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
                            <th>quantity</th>
                            <th>Total</th>
                            <th>CreatedAt</th>
                            <th>UpdatedAt</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart && cart.map((product, index) => {
                                const cartItem = cart.find(p => p.id === product.id);

                                console.log('product', product)
                                return (
                                    <tr key={index}>
                                        <td>{product.id}</td>
                                        <td>{product.title}</td>
                                        <td><img src={product.image} className='w-10' alt="" /></td>
                                        <td>{product.description}</td>
                                        <td>{product.rating}</td>
                                        <td>{product.numReveiw}</td>
                                        <td>{product.price}฿</td>
                                        <td>{product.quantity || 0}</td>
                                        <td>฿{(product.price * cartItem.quantity).toFixed(2)}</td>
                                        <td>{product.createdAt}</td>
                                        <td>{product.updateAt}</td>


                                        <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                                            <button className='btn btn-primary btn-sm me-1'
                                                onClick={() => getCart(product)}>
                                                Add More
                                            </button>
                                            <button className='btn btn-danger btn-sm me-1'
                                                onClick={() => removeFromCart(product.id)}>
                                                Remove One
                                            </button>
                                        </td>




                                    </tr>

                                )

                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="7" className="text-right font-bold">Total Price:</td>
                            <td colSpan="2">${totalPrice.toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>
                <button className="btn btn-success mt-3"
                onClick={() => createOrder(token)}>
                Checkout
            </button>
            </div>
        </div>
    )
}

export default Card