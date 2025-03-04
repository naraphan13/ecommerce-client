import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import useUserStore from '../store/userStore'
import Addpicture from './Addpicture'
import useProductStore from '../store/productStore'
import { useNavigate } from 'react-router'

const initInput = {

    title: '',
    description: '',
    price: '',
    quantity: '',
    categoryId: '',
    userId: ''
}

function UpdateProduct() {
    const user = useUserStore(state => state.user)
    const token = useUserStore(state => state.token)
    console.log('user', user)
    const updatePosts = useProductStore(state => state.updatePosts)
    const products = useProductStore(state => state.products)
    const navigate = useNavigate()

    const product = useProductStore(state=>state.product)

    console.log('product', product)

    const [input, setInput] = useState({

        title: product.title || '',
        description: product.description || '',
        price: product.price || '',
        quantity: product.quantity || '',
        categoryId: product.categoryId || '',
        userId: product.userId || ''
    })
    const [file, setFile] = useState(null)

    console.log('products', products)

    const hdlChange = e => {

        setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))

    }


    const hdlClearInput = () => {

        setInput(initInput)

    }


    const hdlRegister = async (e) => {
        try {

            const { title, description, price, quantity, categoryId, userId } = input
            console.log('input', input)
            console.log('categoryId', categoryId)
            console.log('userId', userId)
            e.preventDefault()
            //validation
            if (!title.trim() || !description.trim() || !price.trim() || !quantity.trim()) {
                return toast('please fill all inputs')
            }


            const body = new FormData();
            body.append("title", title);
            body.append("description", description);
            body.append("price", price);
            body.append("quantity", quantity);
            body.append("categoryId", categoryId);
            body.append("userId", user?.id);

            if (file) { // ถ้ามีไฟล์แนบ
                body.append("image", file);
            }

            // toast.success(JSON.stringify(input),{position:'top-center'})
            // send request to api

            await updatePosts(product.id, token, body)
            hdlClearInput()

            toast.success('Register successful')
            navigate('/products')






        } catch (err) {
            console.log(err);
            const errMsg = err.response?.data?.error || err.message
            toast.error(errMsg)

        }

    }


    return (
        <>

            <div className='text-3xl text-center opacity-70'>Create a new account</div>
            <div className='divider opacity-60'></div>
            <form onSubmit={hdlRegister} className='flex flex-col gap-5 p-4 pt-3' id='register-all'>
                <div className="flex gap-2">
                    <input type="text"
                        placeholder='Title'
                        className='input input-bordered w-full'
                        name='title'
                        value={input.title}
                        onChange={hdlChange}
                    />

                </div>



                <div className="flex gap-2">
                    <input type="text"
                        placeholder='Description'
                        className='input input-bordered w-full'
                        name='description'
                        value={input.description}
                        onChange={hdlChange}
                    />
                </div>
                <div className="flex gap-2">
                    <input type="text"
                        placeholder='Price'
                        className='input input-bordered w-full'
                        name='price'
                        value={input.price}
                        onChange={hdlChange}
                    />
                </div>
                <div className="flex gap-2">
                    <input type="text"
                        placeholder='Quantity'
                        className='input input-bordered w-full'
                        name='quantity'
                        value={input.quantity}
                        onChange={hdlChange}
                    />
                </div>
                <div className="flex gap-2">
                    <input type="text"
                        placeholder='CategoryId'
                        className='input input-bordered w-full'
                        name='categoryId'
                        value={input.categoryId}
                        onChange={hdlChange}
                    />
                </div>
                <Addpicture file={file} setFile={setFile} />

                <button className='btn btn-secondary text-xl text-white'>CREATE</button>
                <button className='btn btn-warning text-xl text-white'
                    type='button'
                    onClick={hdlClearInput}
                >Reset</button>

            </form>
        </>
    )
}

export default UpdateProduct