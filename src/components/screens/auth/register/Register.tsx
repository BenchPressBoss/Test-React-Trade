import styles from './Register.module.scss'
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
		<div className={styles.wrapper}>
			<h2>Register</h2>
			<form onSubmit={handleSubmit}>
				<div className={styles.inputBlock}>
					<input
						type='email'
						id='email'
						placeholder='Email'
						ref={emailRef}
						required
					/>
				</div>
				<div className={styles.inputBlock}>
					<input
						type='password'
						id='password'
						placeholder='Password'
						ref={passwordRef}
						required
					/>
				</div>
				<div className={styles.inputBlock}>
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
