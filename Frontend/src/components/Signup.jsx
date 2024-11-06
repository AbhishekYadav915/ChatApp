import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';

const Signup = () => {
  const [authUser, setAuthUser] = useAuth();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const validatePasswordMatch = (value) => {
    return value === password || "Passwords do not match";
  };

  const onSubmit =async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    setLoading(true);

    await axios.post("/api/user/signup", userInfo)
      .then((response) => {
        toast.success("Signup Successful");
        setAuthUser(response.data);
        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error: " + error.response.data.error);
        }
        setLoading(false);
      });
  };

  return (
    <div className='flex h-screen items-center justify-center bg-current'>
      <form onSubmit={handleSubmit(onSubmit)} className='border border-white px-6 py-2 rounded-md space-y-3 w-96'>
        <h1 className='text-2xl text-center text-yellow-300'>
          Chat<span className='text-green-600 font-semibold'>App</span>
        </h1>
        <h2 className='text-white text-xl font-semibold'>Signup</h2>

        {/* Fullname */}
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" {...register("fullname", { required: true })} placeholder="Fullname" />
        </label>
        {errors.fullname && <span className='text-red-600 font-semibold'>This field is required</span>}

        {/* Email */}
        <label className="input input-bordered flex items-center gap-2">
          <input type="email" className="grow" {...register("email", { required: true })} placeholder="Email" />
        </label>
        {errors.email && <span className='text-red-600 font-semibold'>This field is required</span>}

        {/* Password */}
        <label className="input input-bordered flex items-center gap-2">
          <input type="password" className="grow" {...register("password", { required: true })} placeholder="Password" />
        </label>
        {errors.password && <span className='text-red-600 font-semibold'>This field is required</span>}

        {/* Confirm Password */}
        <label className="input input-bordered flex items-center gap-2">
          <input type="password" className="grow" {...register("confirmPassword", { required: true, validate: validatePasswordMatch })} placeholder="Confirm Password" />
        </label>
        {errors.confirmPassword && <span className='text-red-600 font-semibold'>{errors.confirmPassword.message}</span>}

        {/* Submit Button */}
        <div className='text-white flex justify-between'>
          <p>Have an account?<NavLink to={'/login'} className='text-blue-700 underline cursor-pointer ml-1'>Login</NavLink></p>
          <input type="submit" value={loading ? "Signing up..." : "Signup"} className={`text-white bg-green-500 px-2 py-1 rounded-lg cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading} />
        </div>
      </form>
    </div>
  );
};

export default Signup;
