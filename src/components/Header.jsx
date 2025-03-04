import React, { useEffect, useState } from 'react'
import CartIcon1, { FriendIcon, HomeIcon, LogoShop, MenuIcon, MsgIcon, NotificationIcon, PlayIcon, SearchIcon, ShopIcon } from '../icons'
import Avatar from './Avatar'
import { Link } from 'react-router'
import useUserStore from '../store/userStore'
import Profile from '../pages/Profile'
import useProductStore from '../store/productStore'
function Header() {

    const logout = useUserStore(state => state.logout)
    const user = useUserStore(state => state.user)
    const products = useProductStore(state => state.products)
    const [isOpen, setIsOpen] = useState(false)
    const [carts, setCarts] = useState(0)

    console.log('products', products)



    return (
        <>


            <header className='flex justify-between px-3 h-14 w-full shadow-lg bg-white fixed top-0 z-10'>
                {/* Search bar */}

                <div className='flex-1  flex gap-2 items-center'>
                    <LogoShop className='w-12' />
                    <label className="input input-bordered flex items-center gap-2 w-64 h-10 rounded-full">
                        <input type="text" className="grow" placeholder="Search" />
                        <SearchIcon className='w-5' />
                    </label>

                </div>
                {/* Center icon menu */}

                <div className='flex-1 flex gap-2 justify-center max-lg:hidden'>
                    <div

                        className='flex justify-center w-20 hover:border-b-2 hover:border-blue-900 hover:animate-bounce items-center'>

                        <div>Home</div>
                    </div>
                    <div

                        className='flex justify-center w-20 hover:border-b-2 hover:border-blue-900 hover:animate-bounce items-center'>

                        <div><Link to='products'>Products</Link></div>
                    </div>
                    <div className='flex justify-center w-20 hover:border-b-2 hover:border-blue-900 hover:animate-bounce items-center'>

                        <div>Category</div>
                    </div>
                    <div className='flex justify-center w-20 hover:border-b-2 hover:border-blue-900 hover:animate-bounce items-center'>

                        <div><Link to='cart'>
                            Cart
                        </Link>
                        </div>
                    </div>
                    <div

                        className='flex justify-center w-20 hover:border-b-2 hover:border-blue-900 hover:animate-bounce items-center'>

                        <div><Link to='order'>
                            Order
                        </Link>
                        </div>
                    </div>


                </div>

                {/* Right menu + drop down */}



                <div className='flex-1 flex gap-3 justify-end '>

                    <div className="avatar justify-center items-center">
                        <div className="w-10 h-10 rounded-full !flex justify-center items-center bg-gray-300 hover:bg-gray-400">
                            <MenuIcon className='w-5' />
                        </div>
                    </div>
                    <div className="avatar justify-center items-center">
                        <div className="w-10 h-10 rounded-full !flex justify-center items-center bg-gray-300 hover:bg-gray-400">
                            <MsgIcon className='w-5' />
                        </div>
                    </div>


                    <div className="avatar justify-center items-center">
                        <div className="w-10 h-10 rounded-full !flex justify-center items-center bg-gray-300 hover:bg-gray-400">
                            <button
                                onClick={() => setIsOpen(true)}
                            >

                                {
                                    carts.length
                                }

                                <CartIcon1 className='w-5' />
                            </button>
                        </div>
                    </div>

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-circle m-1">
                            <Avatar
                                className='w-8 h-8 rounded-full bg-slate-400 overflow-hidden'
                                menu={true}
                                imgSrc={user?.profileImage}
                            />

                        </div>

                        {user?.firstName ? <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li><Link to='profile'>Profile</Link></li>
                            <li><Link to='updateprofile'>Edit Profile</Link></li>
                            {user?.Role === 'ADMIN' ? <li><Link to='createproduct'>Create Product</Link></li>
                                :
                                <div></div>
                            }

                            <div className='divider my-0'></div>
                            <li onClick={logout}><a>Logout</a></li>
                        </ul>
                            :
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">

                                <li><Link to='register'>Register</Link></li>
                                <li><Link to='login'>Login</Link></li>


                            </ul>

                        }


                    </div>
                    <div className='flex justify-center items-center'>{user?.firstName}</div>


                </div>








                <div
                    className={`fixed top-0 right-0 w-80 h-full bg-white dark:bg-gray-900 shadow-lg  transition-transform duration-300 z-50 
                    ${isOpen ? 'translate-x-0' : 'translate-x-full '
                        }`}
                >
                    <div className="p-4 flex justify-between items-center border-b ">
                        <h2 className="text-lg font-bold ">Your Cart</h2>
                        <button onClick={() => setIsOpen(false)} className="text-red-600">✖</button>
                    </div>


                    <div className="p-4 space-y-2 ">
                        {carts.length === 0 ? (
                            <p className="text-gray-500">ไม่มีสินค้าในตะกร้า</p>
                        ) : (
                            products.map((item, index) => (
                                <div key={index} className="flex justify-between border-b p-2 flex-col z-100">
                                    <span className='dark:text-white'>{item.title}</span>
                                    <img src={item.image} alt=""
                                        className='w-20 h-20 object-cover dark:text-white'
                                    />
                                    <span className="font-bold dark:text-white">{item.price}฿</span>
                                    <span className="font-bold dark:text-white">{item.quantity}</span>
                                    <button className='bg-lime-600'>+</button>
                                    <button className='bg-red-600'>-</button>

                                </div>
                            ))
                        )}
                    </div>
                </div>
                {/* Sidebar */}
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black opacity-40 "
                        onClick={() => setIsOpen(false)}
                    >
                    </div>
                )}










            </header>

        </>
    )
}

export default Header