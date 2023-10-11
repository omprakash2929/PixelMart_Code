import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'
export const Forgot = () => {
    const [email , setEmail] = useState("")
    const [answer , setAnswer] = useState("")
    const [newPassword , setNewPassword] = useState("")
    const navigate = useNavigate();
    
//! Forgot Password
    const handleSubmit = async(e) =>{
         e.preventDefault();
         try {
            const res = await axios.post(`/api/v1/auth/forgot-password`,{
                email,
                answer,
                newPassword,
            })
            
            if(res.data.success){
                toast.success(res.data.message);
                navigate( '/login');
            }else{
                
                toast.error(res.data.message)
            }
            
         } catch (error) {
            console.log(error);
            toast.error("someting worn");
         }
    }
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
        <ToastContainer/>
            <div className="max-w-sm w-full text-gray-600">
                <div className="text-center">
                    <img src="https://floatui.com/logo.svg" width={150} className="mx-auto" />
                    <div className="mt-5 space-y-2">
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Forgot your password </h3>
                        {/* <p className="">Don't have an account? <a href="" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</a></p> */}
                    </div>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >
                    <div>
                        <label className="font-medium">
                            Email
                        </label>
                        <input
                            onChange={(e)=> setEmail(e.target.value)}
                            value={email}
                            type="email"
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="font-medium">
                            Answer
                        </label>
                        <input
                            onChange={(e)=>setAnswer(e.target.value)}
                            value={answer}
                            type="answer"
                            placeholder='Your pet names'
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="font-medium">
                            New Password
                        </label>
                        <input
                            onChange={(e)=>setNewPassword(e.target.value)}
                            value={newPassword}
                            type="password"
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                    </div>
                    <button
                        className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                    >
                        Reset Password
                    </button>
                    <div className="text-center">
                        <Link to="/login" className="hover:text-indigo-600">Login Here</Link>
                    </div>
                </form>
            </div>
        </main>
  )
}
