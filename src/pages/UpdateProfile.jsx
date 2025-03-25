// import axios from 'axios'
// import React, { useState } from 'react'
// import { toast } from 'react-toastify'
// import useUserStore from '../store/userStore'

// // const initInput = {

// //     firstName: user.firstName || '',
// //     lastName: user.lastName || '',
// //     email: user.email || '',
// //     password: user.password ||'',
// //     confirmPassword: user.password || ''

// // }


// function UpdateProfile() {

//     const user = useUserStore(state => state.user)
//     const updateUser = useUserStore(state => state.updateUser)
//     const token = useUserStore(state => state.token);
//     const initInput = {

//         firstName: user?.firstName || '',
//         lastName: user?.lastName || '',
//         email: user?.email || '',
//         address: user?.address || ""
//     }


//     console.log('user', user)

//     const [input, setInput] = useState(initInput)


//     const hdlChange = e => {

//         setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))

//     }


//     const hdlClearInput = () => {

//         setInput(initInput)

//     }


//     const hdlRegister = async e => {
//         try {

//             const { firstName, lastName, email, password, confirmPassword ,address } = input

//             e.preventDefault()
//             //validation
//             if (!firstName.trim() || !lastName.trim() || !email.trim()) {
//                 return toast('please fill all inputs')
//             }
//             // if (password !== confirmPassword) {

//             //     return toast("Password and Confirm password unmatched!!!")

//             // }
//             // toast.success(JSON.stringify(input),{position:'top-center'})
//             // send request to api



//             await updateUser(user.id, input,token)

//             // document.getElementById('register-form').close()

//             toast.success('Register successful')






//         } catch (err) {
//             console.log(err);
//             const errMsg = err.response?.data?.error || err.message
//             toast.error(errMsg)

//         }

//     }


//     return (
//         <>

//             <div className='text-3xl text-center opacity-70'>Edit account</div>
//             <div className='divider opacity-60'></div>
//             <form onSubmit={hdlRegister} className='flex flex-col gap-5 p-4 pt-3' id='register-all'>
//                 <div className="flex gap-2">
//                     <input type="text"
//                         placeholder='First name'
//                         className='input input-bordered w-full'
//                         name='firstName'
//                         value={input.firstName}
//                         onChange={hdlChange}
//                     />
//                     <input type="text"
//                         placeholder='Last name'
//                         className='input input-bordered w-full'
//                         name='lastName'
//                         value={input.lastName}
//                         onChange={hdlChange}
//                     />
//                 </div>

//                 <div className="flex gap-2">
//                     <input type="text"
//                         placeholder='E-mail or Phone number '
//                         className='input input-bordered w-full'
//                         name='email'
//                         value={input.email}
//                         onChange={hdlChange}
//                     />
//                 </div>
//                 <div className="flex gap-2">
//                     <input type="text"
//                         placeholder='Address'
//                         className='input input-bordered w-full'
//                         name='address'
//                         value={input.address}
//                         onChange={hdlChange}
//                     />
//                 </div>
//                 <div className="flex gap-2">
//                     <input type="password"
//                         placeholder='New password'
//                         className='input input-bordered w-full'
//                         name='password'
//                         value={input.password}
//                         onChange={hdlChange}
//                     />
//                 </div>
//                 <div className="flex gap-2">
//                     <input type="password"
//                         placeholder='Confirm password'
//                         className='input input-bordered w-full'
//                         name='confirmPassword'
//                         value={input.confirmPassword}
//                         onChange={hdlChange}
//                     />
//                 </div>
//                 <button className='btn btn-secondary text-xl text-white'>EDIT</button>
//                 <button className='btn btn-warning text-xl text-white'
//                     type='button'
//                     onClick={hdlClearInput}
//                 >Reset</button>

//             </form>
//         </>
//     )
// }

// export default UpdateProfile
























































import React, { useState } from 'react'
import { toast } from 'react-toastify'
import useUserStore from '../store/userStore'
import { useNavigate } from 'react-router'

function UpdateProfile() {
    const user = useUserStore(state => state.user)
    const updateUser = useUserStore(state => state.updateUser)
    const token = useUserStore(state => state.token)
    const navigate = useNavigate()
    const initInput = {
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        address: user?.address || '',
        password: '',
        confirmPassword: ''
    }

    const [input, setInput] = useState(initInput)

    const hdlChange = e => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const hdlClearInput = () => {
        setInput(initInput)
    }

    const hdlRegister = async e => {
        try {
            e.preventDefault()
            const { firstName, lastName, email, password, confirmPassword, address } = input

            if (!firstName.trim() || !lastName.trim() || !email.trim()) {
                return toast.error('Please fill all required fields')
            }

            if (password || confirmPassword) {
                if (password !== confirmPassword) {
                    return toast.error('Passwords do not match')
                }
            }

            const payload = {
                firstName,
                lastName,
                email,
                address,
                ...(password && { password }) // ส่ง password เฉพาะถ้ากรอกจริง
            }

            await updateUser(user.id, payload, token)
            toast.success('Profile updated successfully')
navigate('/profile')


} catch (err) {
    const errMsg = err.response?.data?.error || err.message
    toast.error(errMsg)
}
  }

return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Edit Profile</h2>
        <div className="divider"></div>

        <form onSubmit={hdlRegister} className="space-y-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="label">
                        <span className="label-text">First Name</span>
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        className="input input-bordered w-full"
                        value={input.firstName}
                        onChange={hdlChange}
                        placeholder="First Name"
                    />
                </div>

                <div>
                    <label className="label">
                        <span className="label-text">Last Name</span>
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        className="input input-bordered w-full"
                        value={input.lastName}
                        onChange={hdlChange}
                        placeholder="Last Name"
                    />
                </div>
            </div>

            <div>
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input
                    type="text"
                    name="email"
                    className="input input-bordered w-full"
                    value={input.email}
                    onChange={hdlChange}
                    placeholder="Email or phone number"
                />
            </div>

            <div>
                <label className="label">
                    <span className="label-text">Address</span>
                </label>
                <input
                    type="text"
                    name="address"
                    className="input input-bordered w-full"
                    value={input.address}
                    onChange={hdlChange}
                    placeholder="Address"
                />
            </div>

            {/* <div>
                <label className="label">
                    <span className="label-text">New Password</span>
                </label>
                <input
                    type="password"
                    name="password"
                    className="input input-bordered w-full"
                    value={input.password}
                    onChange={hdlChange}
                    placeholder="New Password"
                />
            </div> */}

            {/* <div>
                <label className="label">
                    <span className="label-text">Confirm Password</span>
                </label>
                <input
                    type="password"
                    name="confirmPassword"
                    className="input input-bordered w-full"
                    value={input.confirmPassword}
                    onChange={hdlChange}
                    placeholder="Confirm Password"
                />
            </div> */}

            <div className="flex gap-4 pt-4">
                <button type="submit" className="btn btn-success w-1/2 text-white">
                    Save Changes
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

export default UpdateProfile
