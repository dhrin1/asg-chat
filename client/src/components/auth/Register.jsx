import React, {  useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import {AiOutlineUpload} from 'react-icons/ai'


export default function Register() {
    
    const [fields, setFields] = useState({
        name: '',
        email: '',
        password: '',
        file: ''
    })

    const [load, setLoad] = useState(false);

    const fileRef = useRef();

    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value,  } = e.target
        setFields({ ...fields, [name]:value  })        
    }

    const handleOnChangeFile = (e) => {
        const file = e.target.files[0]
        
            const type = file['type']
            const isValid = ['image/gif', 'image/jpeg', 'image/png']
            if(isValid.includes(type)){
                setLoad(true)
                const data = new FormData();
                data.append("file", file);
                data.append("upload_preset", "chat-app");
                data.append("cloud_name", "dforcddtv");
                fetch("https://api.cloudinary.com/v1_1/dforcddtv/image/upload", {
                    method: "POST",
                    body: data
                }).then((res)=>res.json())
                .then((data)=>{
                    console.log(data)
                    setFields({...fields, file: data.url.toString()});
                    setLoad(false)
                })
                .catch((err)=>{
                    console.log(err)
                    setLoad(false)
                })
            }
    }


    const onSubmit = async (e) => {
        e.preventDefault();
        setLoad(true);
        try {
            const { data } = await axios.post("/user", fields, {
                headers: {
                    "Content-type": "application/json",
                },
            });
            navigate('/')
            localStorage.setItem("user", JSON.stringify(data));
            setLoad(false)
        } catch (error) {
            console.log(error)
            setLoad(false)
        }

    }

  return (
    <main className="h-screen bg-gray-50 flex justify-center items-center">
        <div className="bg-white border shadow-md rounded-md p-10 max-w-sm w-full m-5">
            <h2 className="text-2xl mb-2">Register</h2>
            <form onSubmit={onSubmit} >
                <div className="mb-2">
                    <label htmlFor="name" className="text-small">Name</label>
                    <input type="text" name="name" onChange={handleOnChange} className="border px-2 h-9 w-full rounded bg-gray-50" />
                </div>
                <div className="mb-2">
                    <label htmlFor="email" className="text-small">Email</label>
                    <input type="email" name="email" onChange={handleOnChange} className="border px-2 h-9 w-full rounded bg-gray-50" />
                </div>
                <div className="mb-2">
                    <label htmlFor="password" className="text-small">Password</label>
                    <input type="password" name="password" onChange={handleOnChange} className="border px-2 h-9 w-full rounded bg-gray-50" />
                </div>
                <div className="mb-2">
                    {fields.file ? 
                            <div className="flex justify-center items-center" >
                                <div className="grid">
                                    <img src={fields.file ? fields.file : URL.createObjectURL(fields.file)}  className="h-32 w-32 rounded-full select-none" />
                                    <button type="button" className="text-gray-400 text-small" onClick={()=>setFields({...fields, file: ''})}>Cancel</button>
                                </div>
                            </div>
                         :     
                        <div onClick={()=> fileRef.current.click()} disabled={load} className="p-2 rounded-sm cursor-pointer border mb-2 bg-gray-50 border-gray-300 hover:bg-gray-200 flex items-center justify-center">
                            <div className="flex gap-x-2 items-center">
                                <AiOutlineUpload size={20} />
                                <small>{load ? 'Uploading...' : 'Upload avatar here'}</small>
                            </div>
                        </div>  
                    }
                    <input type="file" ref={fileRef} name="file" disabled={load} accept="image/*"  onChange={handleOnChangeFile} className="border px-2 h-9 w-full rounded bg-gray hidden" placeholder="Enter your password" />
                </div>
                <div className="mb-2">
                    <button type="submit" disabled={load} className={`border px-2 rounded shadow-sm h-9 bg-blue-600 w-full text-white ${load ? `opacity-50` : ''}`}>Sign up</button>
                </div>
            </form>
            <p className="text-sm text-gray-800 font-normal">Already have an account? <Link to={'/login'} >Login</Link></p>
        </div>
    </main>
  )
}
