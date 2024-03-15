import axios, { AxiosError } from 'axios'
import HttpStatusCode from '../constans/httpStatusCode.enum'

export function isAxiosError<T>(error: any): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: AxiosError): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}
