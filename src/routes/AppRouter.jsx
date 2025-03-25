import React from 'react'
import Login from '../pages/Login'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import App from '../App'
import Header from '../components/Header'
import useUserStore from '../store/userStore'
import Profile from '../pages/Profile'
import UpdateProfile from '../pages/UpdateProfile'
import Register from '../pages/Register'
import CreateProduct from '../pages/CreateProduct'
import AllProduct from '../pages/AllProducts'
import UpdateProduct from '../pages/UpdateProduct'
import Cart from '../pages/Cart'
import Order from '../pages/order'
import Home from '../pages/Home'
import CheckoutComplete from '../pages/CheckoutComplete'




const userRouter = createBrowserRouter([

    {
        path: "/", element: <App />,
        children: [
            {
                index: true, element: <>

                <Home/>




                </>
            },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: 'updateprofile', element: <UpdateProfile /> },
            { path: 'profile', element: <Profile /> },
            { path: 'products', element: <AllProduct /> },
            { path: 'cart', element: <Cart /> },
            {path: "/checkout-complete/:session", element: <CheckoutComplete />},
            { path: 'order', element: <Order /> },
            { path: 'createproduct', element: <CreateProduct /> },
            { path: 'products/updateproduct', element: <UpdateProduct /> },
            { path: '*', element: <Navigate to='/' /> }
        ]


    },


])



function AppRouter() {

    const user = useUserStore(state => state.user)
    const finalRouter = user ? userRouter : userRouter


    return (
        <RouterProvider key={user?.id} router={userRouter} />
    )
}

export default AppRouter