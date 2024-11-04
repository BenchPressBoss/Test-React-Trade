import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut
} from 'firebase/auth'
import { useEffect, useState } from 'react'

import { authApp } from '../config/config.firebase'

import { AuthContext } from './AuthContext'

interface AuthProviderProps {
	children: React.ReactNode
}
export function AuthProvider({ children }: AuthProviderProps) {
	const [currentUser, setCurrentUser] = useState(null)
	const [isPending, setIsPending] = useState(true)

	const login = (email: string, password: string) => {
		return signInWithEmailAndPassword(authApp, email, password)
	}
	const register = (email: string, password: string) => {
		return createUserWithEmailAndPassword(authApp, email, password)
	}
	const logout = () => {
		return signOut(authApp)
	}

	useEffect(() => {
		const unsubscribe = authApp.onAuthStateChanged(user => {
			setCurrentUser(user)
			setIsPending(false)
		})

		return unsubscribe
	}, [])
	return (
		<AuthContext.Provider value={{ currentUser, login, register, logout }}>
			{!isPending && children}
		</AuthContext.Provider>
	)
}
