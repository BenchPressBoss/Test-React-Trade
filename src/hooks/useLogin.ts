import { AuthContext } from '@context/AuthContext'
import { routeConfig } from '@routes/PageRoutesConfig'
import { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
	const [isPending, setIsPending] = useState<boolean>(false)
	const [error, setError] = useState<string>('')

	const emailRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)

	const { login } = useContext(AuthContext)
	const navigate = useNavigate()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsPending(true)

		const enteredEmail = emailRef.current?.value || ''
		const enteredPassword = passwordRef.current?.value || ''

		if (!enteredEmail || !enteredPassword) {
			setError('Please enter both email and password')
			setIsPending(false)
			return
		}

		try {
			await login(enteredEmail, enteredPassword)
			navigate(routeConfig.tradeParticipant)
		} catch (error) {
			setError(error instanceof Error ? error.message : 'Authentication error')
		} finally {
			setIsPending(false)
		}
	}

	return {
		isPending,
		error,
		emailRef,
		passwordRef,
		handleSubmit
	}
}
