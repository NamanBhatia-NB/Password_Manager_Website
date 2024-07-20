import React, { useEffect, useRef, useState } from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce
        });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        if (ref.current.src.includes("icons/visibilityoff.png")) {
            ref.current.src = "icons/visibilityon.png"
            passwordRef.current.type = "password"
        }
        else {
            alert("Show the password.")
            ref.current.src = "icons/visibilityoff.png"
            passwordRef.current.type = "text"
        }
    }

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            console.log([...passwordArray, form])
            setForm({ site: "", username: "", password: "" })
            toast('Password saved successfully !', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce
            });
        }
        else{
            toast('Error : Password not saved !', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce
            });
        }
    }

    const deletePassword = (id) => {
        let c = confirm("Are you sure want to delete this password?")
        if (c) {
            setPasswordArray(passwordArray.filter(i => i.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))

            toast('Password deleted successfully !', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce
            });
        }
    }

    const editPassword = (id) => {
        setForm(passwordArray.filter(item => item.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            <ToastContainer />

            <div className="absolute inset-0 -z-10 h-full w-full bg-blue-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-600 opacity-20 blur-[100px]">
                </div></div>

            <div className="p-2 md:newcontainer min-h-[83.5vh]">
                <h1 className='text-4xl text-center font-bold'>
                    <span className='text-blue-600'>&lt;</span>
                    Pass
                    <span className='text-blue-600'>Manager/&gt;</span>
                </h1>
                <p className='text-blue-700 text-lg text-center mb-1'>Your own Password Manager</p>
                <div className="flex flex-col gap-6 items-center">
                    <input value={form.site} name='site' id='site' onChange={handleChange} placeholder='Enter Website URL' type="text" className='rounded-full border border-blue-500 w-full px-4 py-1' />
                    <div className="flex flex-col sm:flex-row gap-6 w-full justify-between">
                        <input value={form.username} name='username' id='username' onChange={handleChange} placeholder='Enter Username' type="text" className='rounded-full border border-blue-500 w-full px-4 py-1' />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} name='password' id='password' onChange={handleChange} placeholder='Enter Password' type="password" className='rounded-full border border-blue-500 w-full px-4 py-1' />
                            <span className='absolute right-1 top-[3px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={30} src="icons/visibilityon.png" alt="visibility" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='flex justify-center items-center gap-3 bg-blue-500 rounded-full py-2 px-4 w-fit hover:bg-blue-400 border border-blue-800'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover" >
                        </lord-icon>
                        Save Password
                    </button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-3xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords to show.</div>}
                    {
                        passwordArray.length !== 0 &&
                        <table className="table-auto w-full overflow-hidden rounded-md mb-10">
                            <thead className='bg-blue-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-blue-100'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='text-center py-2 border border-white gap-2'>
                                            <div className='flex justify-center items-center '>

                                                <a href="{item.site}" target='_blank'>{item.site}</a>
                                                <div className='copy-btn cursor-pointer size-7' onClick={() => { copyText(item.site) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "5px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center py-2 border border-white'>
                                            <div className='flex justify-center items-center '>

                                                <span>
                                                    {item.username}
                                                </span>
                                                <div className='copy-btn cursor-pointer size-7' onClick={() => { copyText(item.username) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "5px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center py-2 border border-white'>
                                            <div className='flex justify-center items-center '>
                                                <span>
                                                    {item.password}
                                                </span>
                                                <div className='copy-btn cursor-pointer size-7' onClick={() => { copyText(item.password) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "5px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center py-2 border border-white' >
                                            <span className='edit-btn cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                            <span className='delete-btn cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager