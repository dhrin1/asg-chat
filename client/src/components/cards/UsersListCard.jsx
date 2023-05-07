import React from 'react'
import { Link } from 'react-router-dom'

export default function UsersListCard(props) {
    const {onClick: handleClick, user} = props
  return (
    <Link to={`t/${user._id}`}  onClick={handleClick} className="w-full py-2 px-3 hover:bg-gray-200 rounded-md" >
        <div className="flex gap-x-2 items-center">
            <img src={user.image} className="h-14 w-14 rounded-full border p-1" />
            <div className="grid ">
                <h2 className="font-semibold mt-1">{user.name}</h2>
                <p className="text-gray-400 text-sm leading-5">32 mins</p>
            </div>
        </div>
    </Link> 
  )
}
