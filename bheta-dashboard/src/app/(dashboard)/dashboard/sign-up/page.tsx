"use client";
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import * as yup from 'yup';
import Link from 'next/link';
import Image from 'next/image';
import { postUser } from '@/app/(dashboard)/dashboard/utils/postregisteruser';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const signupSchema = yup.object().shape({
  first_name: yup.string().required('First Name is required'),
  last_name: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});

export default function SignUpForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserData>({
    resolver: yupResolver(signupSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: UserData) => {
    try {
      const response = await postUser(data);
      if (response.error) {
        setErrorMessage(response.error);
      } else {
        setSuccessMessage('Registration successful! Redirecting to Login');
        setTimeout(() => {
          reset();
          setSuccessMessage(null);
          router.push("/dashboard/login");
        }, 2000);
      }
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  };

  return (
    <div className="flex flex-row h-screen bg-white ">
      <div className="bg-[#1B264F] w-1/2 flex items-center justify-center p-8">
        <Image
          src="/images/image.png"
          alt="logo"
          width={350}
          height={180}
          className="max-w-full h-auto mt-30"
        />
      </div>
      <div className="w-1/2 flex items-start justify-center p-8">
        <div className="max-w-md w-full mt-[50px]">
          <h2 className="text-[48px] font-bold mb-6 text-black text-center mt-8 2xl:mt-8 lg:-mt-16">Create Account</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className='-mt-8'>
              <label htmlFor="firstName" className="block text-xl font-medium text-gray-700 ">
                First name
              </label>
              <input
                type="text"
                id="firstName"
                {...register('first_name')}
                className={`block w-full rounded-md  px-4 py-6 border-black border-2 h-12 2xl:h-16 xl:h-16 ${
                  errors.first_name ? 'border-red-500' : ''
                }`}
              />
              {errors.first_name && <p className="text-red-500">{errors.first_name.message}</p>}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-xl font-medium text-gray-700 ">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                {...register('last_name')}
                className={`mt-1 block w-full rounded-md h-12 2xl:h-16 xl:h-16  px-4 py-6 border-black border-2  ${
                  errors.last_name ? 'border-red-500' : ''
                }`}
              />
              {errors.last_name && <p className="text-red-500">{errors.last_name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-xl font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register('email')}
                className={` px-4 mt-1 block w-full rounded-md py-6 border-black border-2 h-12 2xl:h-16 xl:h-16 ${
                  errors.email ? 'border-red-500' : ''
                }`}
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-xl font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  {...register('password')}
                  className={` px-4 mt-1 block w-full rounded-md py-6 border-black border-2 h-12 2xl:h-16 xl:h-16 ${
                    errors.password ? 'border-red-500' : ''
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>

            <div>
              <button
                type="submit"
                className={`bg-[#1B264F] hover:bg-blue-700 text-white font-bold py-4 px-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out transform hover:scale-105 ml-[28%] mt-[5%]
                 ${
                  isSubmitting ? "opacity-40 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating account..." : "Signup"}
              </button>

              {successMessage && (
                <p className="mt-2 text-green-500 text-center text-sm ml-30">
                  {successMessage}
                </p>
              )}

              {errorMessage && (
                <p className="mt-2 text-red-500 text-center text-sm ml-30">
                  {errorMessage}
                </p>
              )}
            </div>
          </form>

          <p className="mt-4 text-xl 2xl:text-xl xl:text-xl lg:text-md text-center">
            Already have an account? 
            <Link href="/dashboard/login" className="text-[#1B264F] hover:text-[#1B264F]">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
