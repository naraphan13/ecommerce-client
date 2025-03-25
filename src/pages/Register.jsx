import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

const initInput = {

    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: ''
}

function Register() {

    const [input, setInput] = useState(initInput)


    const hdlChange = e => {

        setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))

    }


    const hdlClearInput = () => {

        setInput(initInput)

    }

    const navigate = useNavigate()

    const hdlRegister = async e => {
        try {

            const { firstName, lastName, email, password, confirmPassword, address } = input

            e.preventDefault()
            //validation
            if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
                return toast('please fill all inputs')
            }
            if (password !== confirmPassword) {

                return toast("Password and Confirm password unmatched!!!")

            }
            // toast.success(JSON.stringify(input),{position:'top-center'})
            // send request to api

            const rs = await axios.post('http://localhost:8888/auth/register', input)
            hdlClearInput()
            document.getElementById('register-form')?.close()

            toast.success('Register successful')

navigate('/login')



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
                        placeholder='First name'
                        className='input input-bordered w-full'
                        name='firstName'
                        value={input.firstName}
                        onChange={hdlChange}
                    />
                    <input type="text"
                        placeholder='Last name'
                        className='input input-bordered w-full'
                        name='lastName'
                        value={input.lastName}
                        onChange={hdlChange}
                    />
                </div>

                <div className="flex gap-2">
                    <input type="text"
                        placeholder='E-mail or Phone number '
                        className='input input-bordered w-full'
                        name='email'
                        value={input.email}
                        onChange={hdlChange}
                    />
                </div>
                <div className="flex gap-2">
                    <input type="text"
                        placeholder='Address'
                        className='input input-bordered w-full'
                        name='address'
                        value={input.address}
                        onChange={hdlChange}
                    />
                </div>
                <div className="flex gap-2">
                    <input type="password"
                        placeholder='New password'
                        className='input input-bordered w-full'
                        name='password'
                        value={input.password}
                        onChange={hdlChange}
                    />
                </div>
                <div className="flex gap-2">
                    <input type="password"
                        placeholder='Confirm password'
                        className='input input-bordered w-full'
                        name='confirmPassword'
                        value={input.confirmPassword}
                        onChange={hdlChange}
                    />
                </div>
                <button className='btn btn-secondary text-xl text-white'>Sign up</button>
                <button className='btn btn-warning text-xl text-white'
                    type='button'
                    onClick={hdlClearInput}
                >Reset</button>

            </form>
        </>
    )
}

export default Register