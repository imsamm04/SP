import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = handleSubmit(data =>{
    console.log('data', data);
    
  })

  return (
    <div className='bg-orange-500'>
      <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
        <div className='lg:col-span-2 lg:col-start-4'>
          <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit}>
            <div className='text-2xl'>Đăng nhập</div>
            <input
              name='email'
              type='email'
              className='mt-8 p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
              placeholder='Email'
            />
            <input
              name='password'
              type='password'
              className='mt-2 p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
              placeholder='Password'
              autoComplete='on'
            />
            <div className='mt-3'>
              <button
                type='submit'
                className='flex  w-full items-center justify-center bg-red-500 px-2 py-4 text-sm uppercase text-white hover:bg-red-600'
              >
                Đăng nhập
              </button>
            </div>
            <div className='mt-8 flex items-center justify-center'>
              <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
              <Link to='/register' className='ml-1 text-red-400'>
                Đăng ký
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
