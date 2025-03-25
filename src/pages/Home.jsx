import React from "react";
import { Link } from "react-router";


function Home() {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
            {/* โลโก้และข้อความ */}
            <div className="text-center animate-fade-in">
                <h1 className="text-6xl md:text-8xl font-extrabold drop-shadow-lg">
                    WELCOME TO
                </h1>
                <h2 className="text-5xl md:text-7xl font-black drop-shadow-lg mt-2">
                    SHOPPING PARADISE 🛍️
                </h2>
                

                {/* ปุ่ม Shop Now */}
                <Link to="products">
                    <button className="mt-8 px-8 py-4 text-lg font-bold uppercase bg-white text-purple-600 rounded-full shadow-lg transform transition duration-300 hover:scale-105 hover:bg-yellow-400 hover:text-gray-900">
                        🛒 Shop Now
                    </button>
                </Link>
            </div>

            {/* Background Decoration */}
            <div className="absolute inset-0 flex justify-center items-center opacity-30">
                <img src="https://source.unsplash.com/1600x900/?shopping,store" alt="Shopping" className="w-full h-full object-cover" />
            </div>
        </div>
    );
}

export default Home;
