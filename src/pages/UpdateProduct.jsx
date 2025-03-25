// import axios from 'axios'
// import React, { useState } from 'react'
// import { toast } from 'react-toastify'
// import useUserStore from '../store/userStore'
// import Addpicture from './Addpicture'
// import useProductStore from '../store/productStore'
// import { useNavigate } from 'react-router'

// const initInput = {

//     title: '',
//     description: '',
//     price: '',
//     quantity: '',
//     categoryId: '',
//     userId: ''
// }

// function UpdateProduct() {
//     const user = useUserStore(state => state.user)
//     const token = useUserStore(state => state.token)
//     console.log('user', user)
//     const updatePosts = useProductStore(state => state.updatePosts)
//     const products = useProductStore(state => state.products)
//     const navigate = useNavigate()

//     const product = useProductStore(state=>state.product)

//     console.log('product', product)

//     const [input, setInput] = useState({

//         title: product.title || '',
//         description: product.description || '',
//         price: product.price || '',
//         quantity: product.quantity || '',
//         categoryId: product.categoryId || '',
//         userId: product.userId || ''
//     })
//     const [file, setFile] = useState(null)

//     console.log('products', products)

//     const hdlChange = e => {

//         setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))

//     }


//     const hdlClearInput = () => {

//         setInput(initInput)

//     }


//     const hdlRegister = async (e) => {
//         try {

//             const { title, description, price, quantity, categoryId, userId } = input
//             console.log('input', input)
//             console.log('categoryId', categoryId)
//             console.log('userId', userId)
//             e.preventDefault()
//             //validation
//             if (!title.trim() || !description.trim() || !price || !quantity) {
//                 return toast('please fill all inputs')
//             }


//             const body = new FormData();
//             body.append("title", title);
//             body.append("description", description);
//             body.append("price", price);
//             body.append("quantity", quantity);
//             body.append("categoryId", categoryId);
//             body.append("userId", user?.id);

//             if (file) { // ถ้ามีไฟล์แนบ
//                 body.append("image", file);
//             }

//             // toast.success(JSON.stringify(input),{position:'top-center'})
//             // send request to api

//             await updatePosts(product.id, token, body)
//             hdlClearInput()

//             toast.success('Register successful')
//             navigate('/products')






//         } catch (err) {
//             console.log(err);
//             const errMsg = err.response?.data?.error || err.message
//             toast.error(errMsg)

//         }

//     }


//     return (
//         <>

//             <div className='text-3xl text-center opacity-70'>Create a new account</div>
//             <div className='divider opacity-60'></div>
//             <form onSubmit={hdlRegister} className='flex flex-col gap-5 p-4 pt-3' id='register-all'>
//                 <div className="flex gap-2">
//                     <input type="text"
//                         placeholder='Title'
//                         className='input input-bordered w-full'
//                         name='title'
//                         value={input.title}
//                         onChange={hdlChange}
//                     />

//                 </div>



//                 <div className="flex gap-2">
//                     <input type="text"
//                         placeholder='Description'
//                         className='input input-bordered w-full'
//                         name='description'
//                         value={input.description}
//                         onChange={hdlChange}
//                     />
//                 </div>
//                 <div className="flex gap-2">
//                     <input type="text"
//                         placeholder='Price'
//                         className='input input-bordered w-full'
//                         name='price'
//                         value={input.price}
//                         onChange={hdlChange}
//                     />
//                 </div>
//                 <div className="flex gap-2">
//                     <input type="text"
//                         placeholder='Quantity'
//                         className='input input-bordered w-full'
//                         name='quantity'
//                         value={input.quantity}
//                         onChange={hdlChange}
//                     />
//                 </div>
//                 <div className="flex gap-2">
//                     <input type="text"
//                         placeholder='CategoryId'
//                         className='input input-bordered w-full'
//                         name='categoryId'
//                         value={input.categoryId}
//                         onChange={hdlChange}
//                     />
//                 </div>
//                 <Addpicture file={file} setFile={setFile} />

//                 <button className='btn btn-secondary text-xl text-white'>CREATE</button>
//                 <button className='btn btn-warning text-xl text-white'
//                     type='button'
//                     onClick={hdlClearInput}
//                 >Reset</button>

//             </form>
//         </>
//     )
// }

// export default UpdateProduct






















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

// mock categories (คุณสามารถดึงจาก API/store ได้)
const categories = [
  { id: '1', name: 'Electronics' },
  { id: '2', name: 'Clothing' },
  { id: '3', name: 'Home Appliances' }
]

function UpdateProduct() {
  const user = useUserStore(state => state.user)
  const token = useUserStore(state => state.token)
  const updatePosts = useProductStore(state => state.updatePosts)
  const product = useProductStore(state => state.product)
  const navigate = useNavigate()

  const [input, setInput] = useState({
    title: product.title || '',
    description: product.description || '',
    price: product.price || '',
    quantity: product.quantity || '',
    categoryId: product.categoryId || '',
    userId: product.userId || ''
  })
  const [file, setFile] = useState(null)

  const hdlChange = e => {
    setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
  }

  const hdlClearInput = () => {
    setInput(initInput)
  }

  const hdlRegister = async (e) => {
    try {
      e.preventDefault()
      const { title, description, price, quantity, categoryId } = input

      if (!title.trim() || !description.trim() || !price || !quantity || !categoryId) {
        return toast('Please fill all inputs')
      }

      const body = new FormData()
      body.append("title", title)
      body.append("description", description)
      body.append("price", price)
      body.append("quantity", quantity)
      body.append("categoryId", categoryId)
      body.append("userId", user?.id)

      if (file) {
        body.append("image", file)
      }
console.log('body', body)
      await updatePosts(product.id, token, body)
      hdlClearInput()
      toast.success('Product updated successfully')
      navigate('/products')

    } catch (err) {
      const errMsg = err.response?.data?.error || err.message
      toast.error(errMsg)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-8">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Update Product</h2>
      <div className="divider"></div>
      <form onSubmit={hdlRegister} className="space-y-4">

        {[
          { name: 'title', placeholder: 'Title' },
          { name: 'description', placeholder: 'Description' },
          { name: 'price', placeholder: 'Price' },
          { name: 'quantity', placeholder: 'Quantity' }
        ].map(({ name, placeholder }) => (
          <div key={name}>
            <label className="label">
              <span className="label-text">{placeholder}</span>
            </label>
            <input
              type="text"
              name={name}
              placeholder={placeholder}
              className="input input-bordered w-full"
              value={input[name]}
              onChange={hdlChange}
            />
          </div>
        ))}

        <div>
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <select
            name="categoryId"
            className="select select-bordered w-full"
            value={input.categoryId}
            onChange={hdlChange}
          >
            <option value="">-- Select a category --</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <Addpicture file={file} setFile={setFile} />

        <div className="flex justify-between gap-3 pt-4">
          <button type="submit" className="btn btn-success w-1/2 text-white">
            Update Product
          </button>
          <button
            type="button"
            onClick={hdlClearInput}
            className="btn btn-warning w-1/2 text-white"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateProduct
