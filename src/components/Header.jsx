// import React, { useEffect, useState } from 'react'
// import CartIcon1, { FriendIcon, HomeIcon, LogoShop, MenuIcon, MsgIcon, NotificationIcon, PlayIcon, SearchIcon, ShopIcon } from '../icons'
// import Avatar from './Avatar'
// import { Link } from 'react-router'
// import useUserStore from '../store/userStore'
// import Profile from '../pages/Profile'
// import useProductStore from '../store/productStore'
// function Header() {

//     const logout = useUserStore(state => state.logout)
//     const user = useUserStore(state => state.user)
//     const products = useProductStore(state => state.products)
//     const [isOpen, setIsOpen] = useState(false)
//     const [carts, setCarts] = useState(0)

//     console.log('products', products)



//     return (
//         <>


//             <header className='flex justify-between px-3 h-14 w-full shadow-lg bg-white fixed top-0 z-10'>
//                 {/* Search bar */}

//                 <div className='flex-1  flex gap-2 items-center'>
//                     <LogoShop className='w-12' />
//                     <label className="input input-bordered flex items-center gap-2 w-64 h-10 rounded-full">
//                         <input type="text" className="grow" placeholder="Search" />
//                         <SearchIcon className='w-5' />
//                     </label>

//                 </div>
//                 {/* Center icon menu */}

//                 <div className='flex-1 flex gap-2 justify-center max-lg:hidden'>
//                     <div

//                         className='flex justify-center w-20 hover:border-b-2 hover:border-blue-900 hover:animate-bounce items-center'>

//                         <div><Link to='/'>
//                             Home
//                         </Link>
//                         </div>
//                     </div>
//                     <div

//                         className='flex justify-center w-20 hover:border-b-2 hover:border-blue-900 hover:animate-bounce items-center'>

//                         <div><Link to='products'>Products</Link></div>
//                     </div>
//                     <div className='flex justify-center w-20 hover:border-b-2 hover:border-blue-900 hover:animate-bounce items-center'>

//                         <div>Category</div>
//                     </div>
//                     <div className='flex justify-center w-20 hover:border-b-2 hover:border-blue-900 hover:animate-bounce items-center'>

//                         <div><Link to='cart'>
//                             Cart
//                         </Link>
//                         </div>
//                     </div>
//                     <div

//                         className='flex justify-center w-20 hover:border-b-2 hover:border-blue-900 hover:animate-bounce items-center'>

//                         <div><Link to='order'>
//                             Order
//                         </Link>
//                         </div>
//                     </div>


//                 </div>

//                 {/* Right menu + drop down */}



//                 <div className='flex-1 flex gap-3 justify-end '>

//                     {/* <div className="avatar justify-center items-center">
//                         <div className="w-10 h-10 rounded-full !flex justify-center items-center bg-gray-300 hover:bg-gray-400">
//                             <MenuIcon className='w-5' />
//                         </div>
//                     </div>
//                     <div className="avatar justify-center items-center">
//                         <div className="w-10 h-10 rounded-full !flex justify-center items-center bg-gray-300 hover:bg-gray-400">
//                             <MsgIcon className='w-5' />
//                         </div>
//                     </div> */}


//                     <div className="avatar justify-center items-center">
//                         <div className="w-10 h-10 rounded-full !flex justify-center items-center bg-gray-300 hover:bg-gray-400">
//                             <button
//                                 onClick={() => setIsOpen(true)}
//                             >

//                                 {
//                                     carts.length
//                                 }

//                                 <CartIcon1 className='w-5' />
//                             </button>
//                         </div>
//                     </div>

//                     <div className="dropdown dropdown-end">
//                         <div tabIndex={0} role="button" className="btn btn-circle m-1">
//                             <Avatar
//                                 className='w-8 h-8 rounded-full bg-slate-400 overflow-hidden'
//                                 menu={true}
//                                 imgSrc={user?.profileImage}
//                             />

//                         </div>

//                         {user?.firstName ? <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
//                             <li><Link to='profile'>Profile</Link></li>
//                             <li><Link to='updateprofile'>Edit Profile</Link></li>
//                             {user?.Role === 'ADMIN' ? <li><Link to='createproduct'>Create Product</Link></li>
//                                 :
//                                 <div></div>
//                             }

//                             <div className='divider my-0'></div>
//                             <li onClick={logout}><a>Logout</a></li>
//                         </ul>
//                             :
//                             <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">

//                                 <li><Link to='register'>Register</Link></li>
//                                 <li><Link to='login'>Login</Link></li>


//                             </ul>

//                         }


//                     </div>
//                     <div className='flex justify-center items-center'>{user?.firstName}</div>


//                 </div>








//                 <div
//                     className={`fixed top-0 right-0 w-80 h-full bg-white dark:bg-gray-900 shadow-lg  transition-transform duration-300 z-50 
//                     ${isOpen ? 'translate-x-0' : 'translate-x-full '
//                         }`}
//                 >
//                     <div className="p-4 flex justify-between items-center border-b ">
//                         <h2 className="text-lg font-bold ">Your Cart</h2>
//                         <button onClick={() => setIsOpen(false)} className="text-red-600">✖</button>
//                     </div>


//                     <div className="p-4 space-y-2 ">
//                         {carts.length === 0 ? (
//                             <p className="text-gray-500">ไม่มีสินค้าในตะกร้า</p>
//                         ) : (
//                             products.map((item, index) => (
//                                 <div key={index} className="flex justify-between border-b p-2 flex-col z-100">
//                                     <span className='dark:text-white'>{item.title}</span>
//                                     <img src={item.image} alt=""
//                                         className='w-20 h-20 object-cover dark:text-white'
//                                     />
//                                     <span className="font-bold dark:text-white">{item.price}฿</span>
//                                     <span className="font-bold dark:text-white">{item.quantity}</span>
//                                     <button className='bg-lime-600'>+</button>
//                                     <button className='bg-red-600'>-</button>

//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 </div>
//                 {/* Sidebar */}
//                 {isOpen && (
//                     <div
//                         className="fixed inset-0 bg-black opacity-40 "
//                         onClick={() => setIsOpen(false)}
//                     >
//                     </div>
//                 )}










//             </header>

//         </>
//     )
// }

// export default Header




































// import React, { useState } from "react";
// import CartIcon1, { LogoShop, SearchIcon } from "../icons";
// import Avatar from "./Avatar";

// import useUserStore from "../store/userStore";
// import useProductStore from "../store/productStore";
// import { Link } from "react-router";

// function Header() {
//     const logout = useUserStore(state => state.logout);
//     const user = useUserStore(state => state.user);
//     const products = useProductStore(state => state.products);
//     const [isOpen, setIsOpen] = useState(false);
//     const [carts, setCarts] = useState(0);
//     const cart = useProductStore(state => state.cart);
//     const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

//     return (
//         <>
//             <header className="flex justify-between items-center px-5 h-16 w-full shadow-md bg-white dark:bg-gray-900 fixed top-0 z-50">
//                 {/* Logo + Search Bar */}
//                 <div className="flex items-center gap-3">
//                     <LogoShop className="w-12" />
//                     <label className="relative w-64">
//                         <input
//                             type="text"
//                             className="w-full px-4 py-2 rounded-full bg-gray-100 focus:bg-white focus:outline-none dark:bg-gray-700"
//                             placeholder="Search..."
//                         />
//                         <SearchIcon className="absolute right-3 top-2 w-5 text-gray-400" />
//                     </label>
//                 </div>

//                 {/* Navigation Menu */}
//                 <nav className="hidden md:flex gap-8 font-semibold">
//                     <Link to="/" className="hover:text-blue-600">Home</Link>
//                     <Link to="/products" className="hover:text-blue-600">Products</Link>
//                     <Link to="/cart" className="hover:text-blue-600 relative">
//                         Cart
//                         {carts > 0 && (
//                             <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
//                                 {carts}
//                             </span>
//                         )}
//                     </Link>
//                     <Link to="/order" className="hover:text-blue-600">Order</Link>
//                 </nav>

//                 {/* Profile & Cart */}
//                 <div className="flex items-center gap-4">
//                     {/* Cart Button */}
                    
//                     <Link to="/cart" className="relative">
//   <div className="p-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full transition duration-200">
//     <CartIcon1 className="w-6 h-6 text-gray-800 dark:text-white" />
//   </div>
//   {totalQty > 0 && (
//     <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full shadow-sm">
//       {totalQty}
//     </span>
//   )}
// </Link>
//                     {/* Profile Dropdown */}
//                     <div className="relative">
//                         <button className="p-1">
//                             <Avatar
//                                 className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600"
//                                 imgSrc={user?.profileImage}
//                             />
//                         </button>
//                         <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg w-40 p-2">
//                             {user?.firstName ? (
//                                 <>
//                                     <Link to="/profile" className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Profile</Link>
//                                     <Link to="/updateprofile" className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Edit Profile</Link>
//                                     {user?.Role === "ADMIN" && (
//                                         <Link to="/createproduct" className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Create Product</Link>
//                                     )}
//                                     <hr className="my-2" />
//                                     <button onClick={logout} className="w-full text-left py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
//                                         Logout
//                                     </button>
//                                 </>
//                             ) : (
//                                 <>
//                                     <Link to="/register" className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Register</Link>
//                                     <Link to="/login" className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Login</Link>
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </header>

           

//             {/* Sidebar Overlay */}
//             {isOpen && (
//                 <div
//                     className="fixed inset-0 bg-black opacity-40"
//                     onClick={() => setIsOpen(false)}
//                 ></div>
//             )}
//         </>
//     );
// }

// export default Header;





























































import React, { useState } from "react";
import CartIcon1, { LogoShop, SearchIcon } from "../icons";
import Avatar from "./Avatar";
import useUserStore from "../store/userStore";
import useProductStore from "../store/productStore";
import { Link } from "react-router"; // ✅ fix from 'react-router'

function Header() {
  const logout = useUserStore(state => state.logout);
  const user = useUserStore(state => state.user);
  const cart = useProductStore(state => state.cart);
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center px-6 h-16 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md fixed top-0 z-50">
        {/* Logo + Search */}
        <div className="flex items-center gap-4">
          <LogoShop className="w-10 h-10" />
          <label className="relative w-64">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <SearchIcon className="absolute right-3 top-2 w-5 text-gray-500" />
          </label>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex gap-6 font-medium">
          <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
          <Link to="/products" className="hover:text-yellow-300 transition">Products</Link>
          {/* <Link to="/cart" className="hover:text-yellow-300 transition relative">
            Cart
            {totalQty > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                {totalQty}
              </span>
            )}
          </Link> */}
          <Link to="/order" className="hover:text-yellow-300 transition">Order</Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Cart Button */}
          <Link to="/cart" className="relative">
            <div className="p-2 bg-white text-indigo-600 rounded-full hover:bg-yellow-400 hover:text-white transition">
              <CartIcon1 className="w-6 h-6" />
            </div>
            {totalQty > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full shadow-sm">
                {totalQty}
              </span>
            )}
          </Link>

          {/* Profile */}
          <div className="relative group">
            <button className="p-1">
              <Avatar
                className="w-8 h-8 rounded-full bg-white overflow-hidden"
                imgSrc={user?.profileImage}
              />
            </button>

            {/* Dropdown */}
            <div className="absolute right-0 mt-0 bg-white text-gray-800 dark:bg-gray-800 dark:text-white shadow-lg rounded-lg w-44 p-2 hidden group-hover:block z-50">
              {user?.firstName ? (
                <>
                  <Link to="/profile" className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Profile</Link>
                  <Link to="/updateprofile" className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Edit Profile</Link>
                  {user?.Role === "ADMIN" && (
                    <Link to="/createproduct" className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Create Product</Link>
                  )}
                  <hr className="my-2 border-gray-300 dark:border-gray-600" />
                  <button onClick={logout} className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/register" className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Register</Link>
                  <Link to="/login" className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Login</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Optional: overlay for sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default Header;
