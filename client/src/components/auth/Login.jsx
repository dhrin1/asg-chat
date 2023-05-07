import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


export default function Login() {
    const [fields, setFields] = useState({
        email: '',
        password: ''
    })

    const [load, setLoad] = useState(false)

    const [error, setError] = useState()

    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setFields({ ...fields, [name]: value })
     }
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoad(true)
        try {
            const {data} = await axios.post("/user/login", fields, {
                headers: {
                    "Content-type": "application/json",
                },
            })
            localStorage.setItem("user", JSON.stringify(data))
            navigate('/')
            setLoad(false)
        } catch (error) {
            setError(error?.response?.data.errors)
            setLoad(false)
        }
        
    }
  return (
    <main className="h-screen bg-gray-50 flex justify-center items-center">
        <div className="bg-white border shadow-md rounded-md p-10 max-w-sm w-full m-5">
            <h2 className="text-2xl mb-2">Login</h2>
            {/* {error && <div className="p-2 w-full rounded-sm mb-2 bg-red-600">{error}</div> } */}
            <form onSubmit={onSubmit} >
                <div className="mb-2">
                    <input type="email" name="email" onChange={handleOnChange} className="border px-2 h-9 w-full rounded bg-gray-50" placeholder="Enter your email" />
                    <small className="text-red-600">{error?.email}</small>
                </div>
                <div className="mb-2">
                    <input type="password" name="password" onChange={handleOnChange} className="border px-2 h-9 w-full rounded bg-gray-50" placeholder="Enter your password" />
                    <small className="text-red-600">{error?.password}</small>
                </div>
                <div className="mb-2"> 
                <button type="submit" className={`border px-2 rounded shadow-sm h-9 bg-blue-600 w-full text-white  ${load ? `opacity-50` : ''} `}>Sign In</button>
                </div>
            </form>
            <p className="text-sm text-gray-800 font-normal">Don't have an account? <Link to={'/register'} >Register</Link></p>
        </div>
    </main>
  )
}
