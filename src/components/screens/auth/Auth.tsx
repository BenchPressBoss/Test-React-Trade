import { routeConfig } from 'context/routes/PageRoutesConfig'
import { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../../../context/AuthContext'

interface AuthProps {
	isLogin: boolean
}

// Главное не забыть потом отдельно сделать регистрацию и вход)
export function Auth({ isLogin }: AuthProps) {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [isPending, setIsPending] = useState<boolean>(false)
	const [error, setError] = useState<string>('')

	const { register, login } = useContext(AuthContext)
	const emailRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)
	const confirmPasswordRef = useRef<HTMLInputElement>(null)

	const navigate = useNavigate()
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsPending(true)

		if (emailRef.current && passwordRef.current) {
			const enteredEmail = emailRef.current.value
			const enteredPassword = passwordRef.current.value

			setEmail(enteredEmail)
			setPassword(enteredPassword)

			try {
				if (isLogin) {
					await login(enteredEmail, enteredPassword)
					navigate(routeConfig.tradeParticipant)
				} else if (confirmPasswordRef.current) {
					const enteredConfirmPassword = confirmPasswordRef.current.value

					if (enteredConfirmPassword !== enteredPassword) {
						alert('Passwords do not match')
						setIsPending(false)
						return
					}

					await register(enteredEmail, enteredPassword)
				}
			} catch (error: any) {
				setError(error.message || 'Authentication error')
				setIsPending(false)
				return
			}
		}
		setIsPending(false)
	}

	return (
		<div>
			<h2>{isLogin ? 'Login' : 'Register'}</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						id='email'
						placeholder='Email'
						ref={emailRef}
						required
					/>
				</div>
				<div>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						placeholder='Password'
						ref={passwordRef}
						required
					/>
				</div>
				{!isLogin && (
					<div>
						<label htmlFor='confirmPassword'>Confirm Password</label>
						<input
							type='password'
							id='confirmPassword'
							placeholder='Confirm Password'
							ref={confirmPasswordRef}
							required
						/>
					</div>
				)}
				<button type='submit' disabled={isPending}>
					{isPending ? 'Submitting...' : isLogin ? 'Login' : 'Register'}
				</button>
				{error && <p>{error}</p>}
			</form>
		</div>
	)
}
