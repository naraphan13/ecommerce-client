import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router'
import useUserStore from '../store/userStore'
import { checkOutStatus } from '../store/checkoutStore'

function CheckoutComplete() {
const navigate = useNavigate()
    const { session } = useParams()
    const token = useUserStore(state => state.token)
    const [status, setStatus] = useState(null)



    useEffect(() => {

        fetchPayment()


    }, [])

    const fetchPayment = async () => {

        try {

            const res = await checkOutStatus(token, session)
            setStatus(res.data.status)
            console.log(res);
            console.log("success", res.data.message);

navigate('/order')

        } catch (error) {

            console.log(error);

        }



    }



    if (status === 'open'){
        return <Navigate to="/" />
    }





        return (
    //         <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-base-content">
    //   {/* Spinner */}
    //   <span className="loading loading-infinity loading-lg text-primary mb-6"></span>

    //   {/* Text */}
    //   <h1 className="text-2xl font-bold animate-pulse">Loading, please wait...</h1>

    //   {/* Optional Progress Bar */}
    //   <progress className="progress w-56 mt-6 bg-neutral" value="40" max="100"></progress>
    // </div>


























    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-base-200 via-neutral to-base-300 text-base-content animate-fade-in">
  {/* Spinner */}
  <div className="relative mb-8">
    <span className="loading loading-infinity loading-lg text-primary scale-125 animate-spin-slow" />
    <div className="absolute inset-0 animate-ping-slow rounded-full border-4 border-primary opacity-20"></div>
  </div>

  {/* Glowing Text */}
  <h1 className="text-3xl font-bold text-center text-primary-content animate-pulse drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
    Loading, please wait...
  </h1>

  {/* Neon-style Progress Bar */}

  
  <div className="relative mt-8 w-64">
    <div className="absolute top-0 left-0 h-2 w-full rounded bg-neutral/30 blur-sm"></div>
    <progress
      className="progress w-full h-2 rounded bg-base-100"
      value="40"
      max="100"
    ></progress>
    <div className="absolute top-0 left-0 h-2 bg-gradient-to-r from-primary via-secondary to-accent animate-progress-glow rounded"></div>
  </div>

  <style jsx>{`
    @keyframes fade-in {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes ping-slow {
      0% {
        transform: scale(1);
        opacity: 0.7;
      }
      100% {
        transform: scale(1.8);
        opacity: 0;
      }
    }

    @keyframes progress-glow {
      0% {
        width: 0%;
      }
      100% {
        width: 40%;
      }
    }

    .animate-fade-in {
      animation: fade-in 1s ease-out;
    }

    .animate-ping-slow {
      animation: ping-slow 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
    }

    .animate-progress-glow {
      animation: progress-glow 1s ease-out forwards;
    }

    .animate-spin-slow {
      animation: spin 3s linear infinite;
    }
  `}</style>
</div>

        )
}

export default CheckoutComplete