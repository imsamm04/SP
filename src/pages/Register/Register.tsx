import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { getRules } from '../../utils/rules'
import Input from '../../components/Input/Input'
// import { rules } from '../../utils/rules'
import { schema, Schema } from '../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from '../../apis/auth.api'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from '../../utils/utils'
import { AxiosError } from 'axios'
import { ErrorResponse, ResponseApi } from '../../types/utils.type'
import { AppContext } from '../../contexts/app.context'
import Button from '../../components/Button'
type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>

export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  interface FormData {
    email: string
    password: string
    confirm_password: string
    // name: string // Add the 'name' property to the FormData interface
  }

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    getValues
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })

  // const rules = getRules(getValues)

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data?.data.data.user)
        navigate('/')
      },

      onError: (error: any) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

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
              <Button
                className='flex w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
                isLoading={registerAccountMutation.isLoading}
                disabled={registerAccountMutation.isLoading}
              >
                Đăng ký
              </Button>
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
