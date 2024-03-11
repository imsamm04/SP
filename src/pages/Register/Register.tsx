import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { getRules } from '../../utils/rules'
import Input from '../../components/Input'
// import { rules } from '../../utils/rules'
import { schema, Schema } from '../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'

// interface FormData {
//   email: string
//   password: string
//   confirm_password: string
// }

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>

export default function Register() {
  interface FormData {
    email: string
    password: string
    confirm_password: string
    name: string // Add the 'name' property to the FormData interface
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const rules = getRules(getValues)

  const onSubmit = handleSubmit(
    (data) => {
      console.log('data', data)
    },
    (data) => {
      // const password = getValues('password')
      // console.log('getValues', password)
    }
  )

  console.log('errors', errors)

  return (
    <div className='bg-orange-500'>
      <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
        <div className='lg:col-span-2 lg:col-start-4'>
          <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit}>
            <div className='text-2xl'>Đăng ký</div>
            <Input
              name='email'
              register={register}
              type='text'
              className='mt-8'
              errorMessage={errors.email?.message}
              placeholder='Email'
              // rules={rules.email}
            />
            <Input
              name='password'
              register={register}
              type='password'
              className='mt-2'
              errorMessage={errors.password?.message}
              placeholder='Password'
              // rules={rules.password}
              autoComplete='on'
            />
            <Input
              name='confirm_password'
              register={register}
              type='password'
              className='mt-2'
              errorMessage={errors.confirm_password?.message}
              placeholder='Confirm password'
              // rules={rules.confirm_password}
              autoComplete='on'
            />
            <div className='mt-3'>
              <button
                type='submit'
                className='flex  w-full items-center justify-center bg-red-500 px-2 py-4 text-sm uppercase text-white hover:bg-red-600'
              >
                Đăng ký
              </button>
            </div>
            <div className='mt-8 flex items-center justify-center'>
              <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
              <Link className='ml-1 text-red-400' to='/login'>
                Đăng nhập
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
