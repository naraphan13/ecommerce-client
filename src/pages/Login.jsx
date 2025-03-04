import React, { useState } from 'react'

import Register from './Register'
import { toast } from 'react-toastify'
import axios from 'axios'
import useUserStore from '../store/userStore'
import { useNavigate } from 'react-router'

function Login() {


    const login = useUserStore(state => state.login)

    const navigate = useNavigate()


    const [input, setInput] = useState({

        email: '',
        password: ''
    })




    const hdlChange = e => {

        setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))

    }


    const hdlLogin = async e => {


        try {
            const { email, password } = input

            console.log('input', input)
            e.preventDefault()
            //validation
            if (!email.trim() || !password.trim()) {

                return toast.error('Please fill all inputs')

            }


            let data = await login(input)



            toast.success('Login successful')
            navigate("/")




        } catch (err) {
            const errMsg = err.response?.data?.error || err.message
            console.log(err);
            toast.error(errMsg)

        }

    }


    return (
        <>
            <div className="h-[700px] pt-20 pb-28 bg-[#f2f4f7]">
                <div className="p-5 mx-auto max-w-screen-lg min-h-[540px]  flex justify-between">

                    <div className="flex flex-1 ">
                        <div className='card bg-base-100 w-full h-[350px] shadow-xl mt-8'>


                            <form onSubmit={hdlLogin}>
                                <div className="card-body gap-3 p-4">
                                    <input type="text"
                                        value={input.email}
                                        onChange={hdlChange}
                                        className='input input-bordered w-full '
                                        placeholder='Email'
                                        name='email' />
                                    <input type="password"
                                        value={input.password}
                                        onChange={hdlChange}
                                        className='input input-bordered w-full  '
                                        placeholder='Password'
                                        name='password' />

                                    <button className='btn btn-primary text-xl'
                                    >LOGIN</button>

                                    <p className='text-center cursor-pointer flex-grow-0 opacity-70'>Forgotten password?</p>
                                    <div className="divider my-0"></div>
                                    <button
                                        type='button'
                                        onClick={() => document.getElementById('register-form').showModal()}
                                        className='btn btn-secondary text-lg text-white mx-auto'>Create new account</button>

                                </div>

                            </form>




                        </div>
                    </div>
                </div>
            </div>
            <dialog id="register-form" className="modal">
                <div className="modal-box">
                    <form method='dialog' />
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={e => document.getElementById('register-form').close()}
                    >✕</button>
                    <Register />
                </div>
            </dialog>
        </>
    )
}

export default Login