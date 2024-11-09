import { User, UserCredential } from 'firebase/auth'
import { createContext } from 'react'

export interface AuthContextType {
	currentUser: User | null
	login: (email: string, password: string) => Promise<UserCredential>
	register: (email: string, password: string) => Promise<UserCredential>
	logout: () => Promise<void>
}
export const AuthContext = createContext<AuthContextType | null>(null)
