import { UserRole } from '../models/user.model'

export interface RegisterDTO {
  businessName: string
  businessPhone: string
  email: string
  password: string
}

export interface LoginDTO {
  email: string
  password: string
}

export interface JwtPayload {
  sub: string
  businessId: string
  role: UserRole
}