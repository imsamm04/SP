import { User } from './user.type'
import { ResponseApi, SuccessResponse } from './utils.type'

export type AuthResponse = SuccessResponse<{
  access_token: string
  expires_in: string
  user: User
}>
