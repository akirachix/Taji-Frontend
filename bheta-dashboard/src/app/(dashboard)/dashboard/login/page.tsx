'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { userlogin } from '../utils/postUserDetails';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

type FormData = yup.InferType<typeof schema>;
const Login = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  const onSubmit = async (data: FormData) => {
    const response = await userlogin(data);
    if (response.error) {
      setErrorMessage(response.error);
      setSuccessMessage(null);
    } else {
      setSuccessMessage('Logged in successfully!');
      setErrorMessage(null);
      setTimeout(() => router.push("/dashboard/dashboardpage"), 1000);
    }
  };
  
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex h-screen bg-slate-900">
      <div className="w-1/2 flex flex-col justify-center items-center p-12 bg-[#1B264F]">
        <Image src="/images/image.png" alt="Logo" width={350} height={180} />
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center p-12 bg-white ">
        <h2 className="text-4xl font-semibold mb-12 text-[#1B264F]">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mb-20">
          <div className="mb-16">
            <label className="block text-black font-bold mb-2 mt-10 darker grotesque text-[16px]" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="text"
              {...register('email')}
              className={`shadow appearance-none border border-black text-2xl rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-black text-[16px] font-bold mb-2 mt-10 darker grotesque" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={passwordVisible ? 'text' : 'password'}
                {...register('password')}
                className={`shadow appearance-none border border-black rounded w-full py-4 px-3 text-gray-700 text-2xl leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                <button type="button" onClick={togglePasswordVisibility} className="focus:outline-none">
                  {passwordVisible ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-[#1B264F] hover:bg-blue-700 text-white font-bold py-4 px-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out transform hover:scale-105 ml-[28%] mt-[10%]"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Loading...' : 'Login'}
            </button>
          </div>
          {errorMessage && <p className="text-red-500 text-[20px] italic mt-5 ml-[30px]">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-[20px] italic mt-5 ml-[30px]">{successMessage}</p>}
        </form>
        <p className="mt-4 text-black darker grotesque text-[18px]">
          Don&apos;t have an account? <a href="/dashboard/sign-up" className="text-[#1B264F] hover:text-[#1B264F]">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
