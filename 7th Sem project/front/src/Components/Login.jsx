import React from "react";
import '../CssFiles/Login.css';

export default function Login() {
  return (
    <>
      <div className="w-screen h-screen bg-stone-300 flex justify-center items-center">
        <div className="card bg-white bg-opacity-50 p-8 rounded-lg shadow-lg flex flex-col">
          <h1 className="text-xl font-semibold mb-4">Login</h1>
          
          <label htmlFor="name" className="mb-2 font-C text-4xl font-bold">Name</label>
          <input id="name" className="border border-gray-300 p-2 rounded mb-4" type="text" placeholder="Enter your name" />
          
          <label htmlFor="password" className="mb-2">Password</label>
          <input id="password" className="border border-gray-300 p-2 rounded mb-4" type="password" placeholder="Enter your password" />
          
          <button className="bg-gradient-to-r  from-pink-400 via-blue-300 to-blue-500 ">Login</button>
        </div>
      </div>
    </>
  );
}
