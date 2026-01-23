export type UserRole = 'ADMIN' | 'PYME'

export interface User {
  id: string
  email: string
  passwordHash: string
  role: UserRole
  businessId: string
  isActive: boolean
  createdAt: Date
}