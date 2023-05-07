import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ErrorPage() {
    const navigate = useNavigate()
  return (
    <div className="h-screen w-screen flex justify-center items-center">
        <div className="grid gap-y-2  text-center">
            <h2 className="text-4xl">404 not found!</h2>
            <p className="text-gray-400">The page you are looking for is not available.</p>
            <button onClick={()=>navigate(-1)} >Back</button>
        </div>        
    </div>
  )
}
