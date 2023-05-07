import React from 'react'
import ChatLogo  from '/assets/images/chat.png'

export default function Home() {
  return (
    <main className="w-full h-screen flex justify-center items-center overflow-hidden select-none">
        <div className="grid text-center">
            <img src={ChatLogo} alt="chat logo" className="h-56 w-56 " />
            <h2 className="text-2xl font-semibold text-gray-800" style={{marginTop: '-50px'}}>ASG Platform</h2>
        </div>
    </main>
  )
}
