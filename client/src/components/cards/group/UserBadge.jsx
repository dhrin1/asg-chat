import React from 'react'
import { FaTimes } from 'react-icons/fa'

export default function UserBadge(props) {
    const { user, onRemove: handleClick } = props
  return (
    <div className="px-2 py-1 border bg-white  rounded-md inline-flex gap-x-1 items-center me-1 mb-1">
        <small>{user.name}</small>
        <button onClick={handleClick} >
            <FaTimes size={10} className="text-blue-700" />
        </button>
    </div>
  )
}
