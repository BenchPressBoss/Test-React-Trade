import { useLogin } from '@/hooks/useLogin'

export const Login = () => {
	const { isPending, error, emailRef, passwordRef, handleSubmit } = useLogin()

	return (
		<div>
			<h2>Login</h2>
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
				<button type='submit' disabled={isPending}>
					{isPending ? 'Submitting...' : 'Login'}
				</button>
				{error && <p>{error}</p>}
			</form>
		</div>
	)
}
