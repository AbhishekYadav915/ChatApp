import React, { useState } from 'react'
import {BiLogOutCircle} from 'react-icons/bi';
import axios from 'axios';
import Cookies from 'js-cookie'
import toast from 'react-hot-toast';

const Logout = () => {
  const [loading , setLoading] = useState(false)
  const handleLogout = async()=>{
    setLoading(true)
    try {
      const res = await axios.post("/api/user/logout");
      localStorage.removeItem("ChatApp")
      Cookies.remove("jwt")
      setLoading(false)
      toast.success("Logged out Successfully")
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log("Error in Logout",error)
      toast.error("Error in logging out")
    }
  }
  return (
    <div className='h-[10vh]'>
        <div>
            <BiLogOutCircle className='text-5xl text-white hover:bg-slate-800 duration-300 cursor-pointer rounded-full p-2 mx-2 mt-1' onClick={handleLogout}/>
        </div>
    </div>
  )
}

export default Logout