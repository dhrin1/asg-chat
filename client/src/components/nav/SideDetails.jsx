import React from 'react'
import { UserDataContext } from '../../context/ContextProvider'
import { CgProfile } from 'react-icons/cg'
import {MdModeEdit} from 'react-icons/md'
import {BiLogOut} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

export default function SideDetails() {
    const data = UserDataContext();
    const navigate = useNavigate()
    const handleLogout = () =>{
        localStorage.removeItem("user")
        navigate('/login')
    }
  return (
    <div className="border-r-gray-100 shadow-md h-screen bg-white p-5">
        <div className="grid gap-y-3">
            <div className="px-2 ">
                <div className="flex gap-x-2 items-center">
                    <img src={data.image} className="rounded-full border p-1 h-20 w-20" />
                    <div className="grid">
                        <h2 className="text-2xl font-semibold text-gray-800">{data.name}</h2>
                        <p className="text-small text-gray-500">{data.email}</p>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center items-center gap-x-3">
                <div className="grid text-center">
                    <button onClick={()=>navigate(`/p/${data._id}`)} className="rounded-full h-10 w-10 flex items-center hover:bg-gray-200 p-3">
                        <CgProfile size={25} />
                    </button>
                    <h2 className="text-sm">Profile</h2>
                </div>
                <div className="grid text-center">
                    <button className="rounded-full h-10 w-10 flex items-center hover:bg-gray-200 p-3">
                        <MdModeEdit size={20} />
                    </button>
                    <h2 className="text-sm">Edit</h2>
                </div>
                
            </div>
            <div clas >
                <button onClick={handleLogout} className="w-full bg-gray-200 hover:bg-gray-300 justify-center rounded-md text-gray-800 h-10 flex items-center gap-x-2 font-semibold">
                    <BiLogOut size={20} />
                    Logout
                </button>
            </div>
        </div>
    </div>
  )
}
