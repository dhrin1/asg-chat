import React from 'react'
import { MdEmojiEmotions, MdImage, MdAttachFile, MdSend } from 'react-icons/md'

export default function ChatInput(props) {
    const {send, type, value } = props
  return (
    <>
        
        <form onSubmit={send} className="h-full">
            <div className="flex gap-x-3 items-center h-full px-3">
                <div className="flex-none ">
                    <div className="flex justify-start gap-x-2 ">
                        <button className="rounded-full  flex items-center  hover:bg-gray-200 p-2" ><MdAttachFile size={20} className="text-blue-700" /></button>
                        <button className="rounded-full  flex items-center  hover:bg-gray-200 p-2" ><MdImage size={20} className="text-blue-700" /></button>
                        <button className="rounded-full  flex items-center  hover:bg-gray-200 p-2" ><MdEmojiEmotions size={20} className="text-blue-700" /></button>
                    </div>
                </div>
                <div className="grow">
                    <input type="text" onChange={type} value={value.content} className="rounded-full bg-gray-200 w-full p-3 focus:outline-none active:ring-0" />
                </div>
                <div className="flex-none ">
                    <button type="submit" className="rounded-full  flex items-center  hover:bg-gray-200 p-3">
                        <MdSend className="text-blue-700" size={25} />
                    </button>
                </div>
            </div>
        </form>
    </>
    
    
  )
}
