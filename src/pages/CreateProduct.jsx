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

// function CreateProduct() {
//     const user = useUserStore(state => state.user)
//     const token = useUserStore(state => state.token)
//     console.log('user', user)
//     const createProduct = useProductStore(state=>state.createProduct)
//     const navigate = useNavigate()

//     const [input, setInput] = useState(initInput)
//     const [file, setFile] = useState(null)

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
//             if (!title.trim() || !description.trim() || !price.trim() || !quantity.trim()) {
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

//             await createProduct(body,token)
//             hdlClearInput()

//             toast.success('createproduct successful')
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

// export default CreateProduct























































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

// mock category list (คุณสามารถดึงจาก API หรือ store ได้)
const categories = [
  { id: '1', name: 'Electronics' },
  { id: '2', name: 'Clothing' },
  { id: '3', name: 'Home & Kitchen' }
]

function CreateProduct() {
  const user = useUserStore(state => state.user)
  const token = useUserStore(state => state.token)
  const createProduct = useProductStore(state => state.createProduct)
  const navigate = useNavigate()

  const [input, setInput] = useState(initInput)
  const [file, setFile] = useState(null)

  const hdlChange = e => {
    setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
  }

  const hdlClearInput = () => {
    setInput(initInput)
    setFile(null)
  }

  const hdlRegister = async (e) => {
    e.preventDefault()
    try {
      const { title, description, price, quantity, categoryId } = input

      if (!title.trim() || !description.trim() || !price.trim() || !quantity.trim() || !categoryId) {
        return toast.error('Please fill all required fields')
      }

      const body = new FormData()
      body.append("title", title)
      body.append("description", description)
      body.append("price", price)
      body.append("quantity", quantity)
      body.append("categoryId", categoryId)
      body.append("userId", user?.id)
console.log('body', body)
      if (file) {
        body.append("image", file)
      }

      await createProduct(body, token)
      hdlClearInput()
      toast.success('Product created successfully!')
      navigate('/products')

    } catch (err) {
      const errMsg = err.response?.data?.error || err.message
      toast.error(errMsg)
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Create New Product</h2>
      <div className="divider"></div>

      <form onSubmit={hdlRegister} className="space-y-4">

        {/* Title */}
        <div>
          <label className="label">
            <span className="label-text">Product Title</span>
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter product title"
            className="input input-bordered w-full"
            value={input.title}
            onChange={hdlChange}
          />
        </div>

        {/* Description */}
        <div>
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input
            type="text"
            name="description"
            placeholder="Enter product description"
            className="input input-bordered w-full"
            value={input.description}
            onChange={hdlChange}
          />
        </div>

        {/* Price */}
        <div>
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input
            type="text"
            name="price"
            placeholder="Enter price"
            className="input input-bordered w-full"
            value={input.price}
            onChange={hdlChange}
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="label">
            <span className="label-text">Quantity</span>
          </label>
          <input
            type="text"
            name="quantity"
            placeholder="Enter quantity"
            className="input input-bordered w-full"
            value={input.quantity}
            onChange={hdlChange}
          />
        </div>

        {/* Category Dropdown */}
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

        {/* Image upload */}
        <Addpicture file={file} setFile={setFile} />

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button type="submit" className="btn btn-primary w-1/2 text-white">
            Create
          </button>
          <button
            type="button"
            className="btn btn-warning w-1/2 text-white"
            onClick={hdlClearInput}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateProduct
