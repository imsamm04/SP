import React from 'react'
import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props {
  type: React.HTMLInputTypeAttribute
  errorMessage?: string | FieldError | any
  placeholder?: string
  className?: string
  name: string
  register: UseFormRegister<any>
  rules?: RegisterOptions | any
  autoComplete?: string
}

export default function Input({ type, errorMessage, placeholder, className, name, register, rules,autoComplete }: Props) {
  return (
    <div className={className}>
      <input
        type={type}
        className='mt-8 p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
        placeholder={placeholder}
        {...register(name, rules)}
        autoComplete={autoComplete}
      />
      <div className='text-red-500 text-left'>{errorMessage}</div>
    </div>
  )
}
