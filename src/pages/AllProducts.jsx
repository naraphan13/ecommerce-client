// import React, { useEffect, useState } from 'react'


// import { Link } from 'react-router'
// import axios from 'axios'

// import { toast } from 'react-toastify'
// import useUserStore from '../store/userStore'
// import useProductStore from '../store/productStore'




// function AllProduct(props) {
//     const getAllProduct = useProductStore(state => state.getAllProduct)
//     const productsa = useProductStore(state => state.products)
//     const token = useUserStore(state => state.token)
//     const user = useUserStore(state => state.user)
//     const deleteProduct = useProductStore(state => state.deleteProduct)
//     const getProduct = useProductStore(state => state.getProduct)
//     const getCart = useProductStore(state => state.getCart)
//     const { product } = props

//     const [products, setProducts] = useState(null)


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
//     console.log('token', token)



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



//     return (
//         <div className='container my-4'>
//             <h2 className='text-center mb-4 font-bold text-3xl'>Products</h2>

//             <div className='row mb-3'>
//                 <div className='col'>







//                 {user?.Role === 'ADMIN' ? <Link to="/Createproduct"
//                         className='btn btn-primary me-1'
//                         role="button"
//                     >Create Product</Link>
//                                             :
//                                             <div></div>
//                                         }










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
//                             <th>CountInStock</th>
//                             <th>CreatedAt</th>
//                             <th>UpdatedAt</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             products && products.map((product, index) => {
//                                 return (
//                                     <tr key={index}>
//                                         <td>{product.id}</td>
//                                         <td>{product.title}</td>
//                                         <td><img src={product.image} className='w-10' alt="" /></td>
//                                         <td>{product.description}</td>
//                                         <td>{product.rating}</td>
//                                         <td>{product.numReveiw}</td>
//                                         <td>{product.price}$</td>
//                                         <td>{product.countInStock}</td>
//                                         <td>{product.createdAt}</td>
//                                         <td>{product.updateAt}</td>


//                                         {user?.Role === 'ADMIN' ? <td style={{ width: "10px", whiteSpace: "nowrap" }}>
//                                             <p className='btn btn-primary btn-sm me-1'
//                                                 href=""><Link to='updateproduct' onClick={()=>getProduct(product)}>Edit</Link></p>
//                                             <button type="button" onClick={()=>hdlDelete(product.id)} className='btn btn-danger btn-sm'>Delete</button>
//                                         </td>
//                                             :
//                                             <td style={{ width: "10px", whiteSpace: "nowrap" }}>
//                                                 <a className='btn btn-primary btn-sm me-1'
//                                                     onClick={()=>getCart(product)}
                                                    
                                                    
//                                                     >Add to cart</a>
//                                                 <button type="button" className='btn btn-danger btn-sm'>Buy</button>
//                                             </td>
//                                         }




//                                     </tr>
//                                 )
//                             })
//                         }
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     )
// }

// export default AllProduct





import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import useUserStore from "../store/userStore";
import useProductStore from "../store/productStore";
import { Link } from "react-router";

function AllProduct() {
    const getAllProduct = useProductStore(state => state.getAllProduct);
    const products = useProductStore(state => state.products);
    const token = useUserStore(state => state.token);
    const user = useUserStore(state => state.user);
    const deleteProduct = useProductStore(state => state.deleteProduct);
    const getProduct = useProductStore(state => state.getProduct);
    const getCart = useProductStore(state => state.getCart);

    const [productList, setProductList] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchData = await getAllProduct(token);
                setProductList(fetchData);
            } catch (err) {
                const errMsg = err.response?.data?.err || err.message;
                toast.error(errMsg);
                console.log(errMsg);
            }
        };
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id, token);
            toast.success("Product deleted successfully!");
            setProductList(productList.filter(product => product.id !== id));
        } catch (err) {
            const errMsg = err.response?.data?.error || err.message;
            toast.error(errMsg);
        }
    };

    return (
        <div className="container mx-auto py-10">
            <h2 className="text-center text-4xl font-bold text-gray-800 mb-8">All Products</h2>

            {user?.Role === "ADMIN" && (
                <div className="flex justify-end mb-4">
                    <Link to="/Createproduct" className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
                        + Add New Product
                    </Link>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {productList.length > 0 ? (
                    productList.map((product) => (
                        <div key={product.id} className="bg-white shadow-lg rounded-lg p-5 hover:scale-105 transition">
                            <img src={product.image} alt={product.title} className="w-full h-40 object-cover rounded-md" />
                            <h3 className="text-lg font-semibold mt-3">{product.title}</h3>
                            <p className="text-gray-500 text-sm mt-1">{product.description}</p>
                            <p className="text-blue-600 font-bold mt-2">${product.price}</p>
                            <p className="text-gray-500 text-sm">Stock: {product.quantity}</p>

                            <div className="mt-4 flex justify-between">
                                {user?.Role === "ADMIN" ? (
                                    <>
                                        <Link to="updateproduct" onClick={() => getProduct(product)} className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition">
                                            Edit
                                        </Link>
                                        <button onClick={() => handleDelete(product.id)} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                                            Delete
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => getCart(product)} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                                            Add to Cart
                                        </button>
                                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                                            Buy Now
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-4">No products found.</p>
                )}
            </div>
        </div>
    );
}

export default AllProduct;
