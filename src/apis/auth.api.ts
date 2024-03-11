import { AuthResponse } from '../types/auth.type'
import http from '../utils/https'

export const registerAccount = (body: { email: string; password: string }) => http.post<AuthResponse>('/register', body)
