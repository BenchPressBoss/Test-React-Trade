import { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '@/context/AuthContext'
import { routeConfig } from '@/routes/PageRoutesConfig'

export const useRegister = () => {
	const [formData, setFormData] = useState<{
		email: string
		password: string
		confirmPassword: string
	}>({
		email: '',
		password: '',
		confirmPassword: ''
	})

	const [isPending, setIsPending] = useState(false)
	const [error, setError] = useState<string>('')

	const emailRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)
	const confirmPasswordRef = useRef<HTMLInputElement>(null)

	const { register } = useContext(AuthContext)
	const navigate = useNavigate()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsPending(true)

		const email = emailRef.current?.value || ''
		const password = passwordRef.current?.value || ''
		const confirmPassword = confirmPasswordRef.current?.value || ''

		setFormData({ email, password, confirmPassword })

		if (password !== confirmPassword) {
			setError('Passwords do not match')
			setIsPending(false)
			return
		}

		try {
			await register(email, password)
			navigate(routeConfig.tradeParticipant)
		} catch (error) {
			setError(error instanceof Error ? error.message : 'Authentication error')
		} finally {
			setIsPending(false)
		}
	}

	return {
		formData,
		handleSubmit,
		isPending,
		error,
		emailRef,
		passwordRef,
		confirmPasswordRef
	}
}
