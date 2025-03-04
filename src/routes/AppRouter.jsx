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




const userRouter = createBrowserRouter([

    {
        path: "/", element: <App />,
        children: [
            {
                index: true, element: <>






                </>
            },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: 'updateprofile', element: <UpdateProfile /> },
            { path: 'profile', element: <Profile /> },
            { path: 'products', element: <AllProduct /> },
            { path: 'cart', element: <Cart /> },
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
        <RouterProvider key={user?.id} router={finalRouter} />
    )
}

export default AppRouter