import { useRegister } from '@/hooks/useRegister'

export function Register() {
	const {
		confirmPasswordRef,
		emailRef,
		handleSubmit,
		isPending,
		passwordRef,
		error
	} = useRegister()
	return (
		<div>
			<h2>Register</h2>
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
				<button type='submit' disabled={isPending}>
					{isPending ? 'Submitting...' : 'Register'}
				</button>
				{error && <p>{error}</p>}
			</form>
		</div>
	)
}
