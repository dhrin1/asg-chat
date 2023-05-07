import React from 'react'
import Sidebar from '../nav/Sidebar'
import SideDetails from '../nav/Sidedetails'


export default function AppLayout({children}) {
  return (
    <div className="grid grid-cols-10 w-full min-h-screen overflow-hidden">
        <div className="col-span-2">
            <Sidebar />
        </div>
        <div className="col-span-6"  >
            {children}
        </div>
        <div className="col-span-2">
            <SideDetails />
        </div>
    
    </div>
        
  )
}
