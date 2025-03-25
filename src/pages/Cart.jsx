// import React, { useEffect, useState } from 'react'


// import { Link } from 'react-router'
// import axios from 'axios'

// import { toast } from 'react-toastify'
// import useUserStore from '../store/userStore'
// import useProductStore from '../store/productStore'




// function Card(props) {
//     const getAllProduct = useProductStore(state => state.getAllProduct)
//     const getCart = useProductStore(state => state.getCart)
//     const productsa = useProductStore(state => state.products)
//     const carts = useProductStore(state => state.carts)
//     const cart = useProductStore(state => state.cart)
//     const token = useUserStore(state => state.token)
//     const user = useUserStore(state => state.user)
//     const deleteProduct = useProductStore(state => state.deleteProduct)
//     const removeFromCart = useProductStore(state => state.removeFromCart)
//     const getProductCart = useProductStore(state => state.getProductCart)
//     const createOrder = useProductStore(state => state.createOrder);
//     const { product } = props

//     const [products, setProducts] = useState(null)

//     console.log('cart', cart)
//     const fetchProducts = async () => {
//         try {

//             const fetchproductdata = await getAllProduct(token)
//             setProducts(fetchproductdata)
//             console.log(products)
//         } catch (err) {
//             const errMsg = err.response?.data?.err || err.message
//             toast.error(errMsg)
//             console.log(errMsg)
//         }
//     }
//     console.log('products', products)



//     useEffect(() => {
//         fetchProducts()
//     }, [])


//     const hdlDelete = async (id) => {

//         try {
//             await deleteProduct(id, token)
//             toast.success('Delete done')
//             // getAllProduct(token)
//             fetchProducts(token)
//         } catch (err) {
//             const errMsg = err.response?.data?.error || err.message
//             toast.error(errMsg)
//             console.log(err);

//         }


//     }


//     const totalPrice = cart.reduce((total, item) => {
//         return total + item.price * item.quantity;
//     }, 0);





//     return (
//         <div className='container my-4'>
//             <h2 className='text-center mb-4 font-bold text-3xl'>CART</h2>

//             <div className='row mb-3'>
//                 <div className='col'>
//                     <Link to="/Createproduct"
//                         className='btn btn-primary me-1'
//                         role="button"
//                     >Create Product</Link>
//                     <button type="button"
//                         className='btn btn-outline-primary'>
//                         Refresh</button>
//                 </div>
//                 <div className='col'>

//                 </div>
//                 <table className='table'>
//                     <thead>
//                         <tr className=''>
//                             <th>ID</th>
//                             <th>Title</th>
//                             <th>Image</th>
//                             <th>Description</th>
//                             <th>rating</th>
//                             <th>numReview</th>
//                             <th>Price</th>
//                             <th>quantity</th>
//                             <th>Total</th>
//                             <th>CreatedAt</th>
//                             <th>UpdatedAt</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             cart && cart.map((product, index) => {
//                                 const cartItem = cart.find(p => p.id === product.id);

//                                 console.log('product', product)
//                                 return (
//                                     <tr key={index}>
//                                         <td>{product.id}</td>
//                                         <td>{product.title}</td>
//                                         <td><img src={product.image} className='w-10' alt="" /></td>
//                                         <td>{product.description}</td>
//                                         <td>{product.rating}</td>
//                                         <td>{product.numReveiw}</td>
//                                         <td>{product.price}฿</td>
//                                         <td>{product.quantity || 0}</td>
//                                         <td>฿{(product.price * cartItem.quantity).toFixed(2)}</td>
//                                         <td>{product.createdAt}</td>
//                                         <td>{product.updateAt}</td>


//                                         <td style={{ width: "10px", whiteSpace: "nowrap" }}>
//                                             <button className='btn btn-primary btn-sm me-1'
//                                                 onClick={() => getCart(product)}>
//                                                 Add More
//                                             </button>
//                                             <button className='btn btn-danger btn-sm me-1'
//                                                 onClick={() => removeFromCart(product.id)}>
//                                                 Remove One
//                                             </button>
//                                         </td>




//                                     </tr>

//                                 )

//                             })
//                         }
//                     </tbody>
//                     <tfoot>
//                         <tr>
//                             <td colSpan="7" className="text-right font-bold">Total Price:</td>
//                             <td colSpan="2">${totalPrice.toFixed(2)}</td>
//                         </tr>
//                     </tfoot>
//                 </table>
//                 <button className="btn btn-success mt-3"
//                 onClick={() => createOrder(token)}>
//                 Checkout
//             </button>
//             </div>
//         </div>
//     )
// }

// export default Card












import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import useUserStore from "../store/userStore";
import useProductStore from "../store/productStore";
import { useNavigate } from "react-router";
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { checkOut } from "../store/checkoutStore";

function Cart() {
    const getAllProduct = useProductStore(state => state.getAllProduct);
    const getCart = useProductStore(state => state.getCart);
    const removeFromCart = useProductStore(state => state.removeFromCart);
    const createOrder = useProductStore(state => state.createOrder);
    const cart = useProductStore(state => state.cart);
    const token = useUserStore(state => state.token);
    const navigate = useNavigate()





    // test
    const [showPayment, setShowPayment] = useState(false);
    const [clientSecret, setClientSecret] = useState(null);
    const [orderId, setOrderId] = useState(null);
    const [loading, setLoading] = useState(false);
    console.log('orderId', orderId)


    const stripePromise = loadStripe("pk_test_51R1NHoFWX5EVFtiE0XvV80N3RkykDsTAw3rIGsk3VHdGRPh8H9CfVUPPxVCmdgzbKJUgnsapNS9vcG4FOy7JZBbH00iEmZbJRN");

    const fetchClientSecret = async (id) => {
        try {
            const res = await checkOut(token, id);
            console.log('ClientSecret:', res.data.clientSecret);
            setClientSecret(res.data.clientSecret);
        } catch (error) {
            console.error("Error fetching client secret:", error);
        }
    };

    const handleCreateOrder = async () => {
        try {
            const orderResponse = await createOrder(token, navigate);
            console.log('orderResponse', orderResponse)
            setOrderId(orderResponse.id);
        } catch (error) {
            console.error("Error creating order:", error);
        }
    };

    const hdlConfirmation = async () => {
        setLoading(true);
        await handleCreateOrder();
        setShowPayment(true);
        setLoading(false);
    };

    useEffect(() => {
        if (orderId) {
            console.log('Fetching client secret for orderId:', orderId);
            fetchClientSecret(orderId);
        }
    }, [orderId]);



    // test


    useEffect(() => {
        getAllProduct(token);
    }, []);

    const totalPrice = cart.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    return (


<>



        <div className="container mx-auto py-10">




            {/* <h2 className="text-center text-4xl font-bold text-gray-800 mb-8">Your Cart 🛒</h2>

            {cart.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {cart.map((product, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg p-5 flex items-center gap-6 hover:scale-105 transition">
                            <img src={product.image} alt={product.title} className="w-24 h-24 object-cover rounded-md" />
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold">{product.title}</h3>
                                <p className="text-gray-500 text-sm">{product.description}</p>
                                <p className="text-blue-600 font-bold mt-2">฿{product.price.toFixed(2)}</p>
                                <p className="text-gray-500 text-sm">Quantity: {product.quantity}</p>
                                <p className="text-gray-800 font-bold mt-2">Total: ฿{(product.price * product.quantity).toFixed(2)}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button onClick={() => getCart(product)} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                                    ➕ Add More
                                </button>
                                <button onClick={() => removeFromCart(product.id)} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                                    ➖ Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {cart.length > 0 && (
                <div className="mt-10 flex justify-between items-center border-t pt-5">
                    <h3 className="text-2xl font-bold text-gray-800">Total Price: ฿{totalPrice.toFixed(2)}</h3>
                    <button
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
                        onClick={hdlConfirmation}
                    >
                        ✅ Checkout
                    </button>
                </div>
            )} */}




{!showPayment && (
  <>
    <h2 className="text-center text-4xl font-bold text-gray-800 mb-8">Your Cart 🛒</h2>

    {cart.length === 0 ? (
      <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
    ) : (
      <div className="grid grid-cols-1 gap-6">
        {cart.map((product, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-5 flex items-center gap-6 hover:scale-105 transition">
            <img src={product.image} alt={product.title} className="w-24 h-24 object-cover rounded-md" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-500 text-sm">{product.description}</p>
              <p className="text-blue-600 font-bold mt-2">฿{product.price.toFixed(2)}</p>
              <p className="text-gray-500 text-sm">Quantity: {product.quantity}</p>
              <p className="text-gray-800 font-bold mt-2">Total: ฿{(product.price * product.quantity).toFixed(2)}</p>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => getCart(product)} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                ➕ Add More
              </button>
              <button onClick={() => removeFromCart(product.id)} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                ➖ Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    )}

    {cart.length > 0 && (
      <div className="mt-10 flex justify-between items-center border-t pt-5">
        <h3 className="text-2xl font-bold text-gray-800">Total Price: ฿{totalPrice.toFixed(2)}</h3>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
          onClick={hdlConfirmation}
        >
        Checkout
        </button>
      </div>
    )}
  </>
)}










            {showPayment && (
                <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow">
                    <h3 className="text-lg font-bold mb-4">Add Payment Method</h3>
                    {clientSecret ? (
                        <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
                            <EmbeddedCheckout />
                        </EmbeddedCheckoutProvider>
                    ) : (
                        <p className="text-gray-600">กำลังโหลดระบบชำระเงิน...</p>
                    )}
                </div>
            )}



        </div>




        </>

    );
}

export default Cart;
