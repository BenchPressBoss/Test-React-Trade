import styles from './Login.module.scss'
import { useLogin } from '@/hooks/useLogin'

export const Login = () => {
	const { isPending, error, emailRef, passwordRef, handleSubmit } = useLogin()

	return (
		<div className={styles.wrapper}>
			<h2>Login</h2>
			<form onSubmit={handleSubmit} className={styles.form}>
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
				<button type='submit' disabled={isPending}>
					{isPending ? 'Submitting...' : 'Login'}
				</button>
				{error && <p>{error}</p>}
			</form>
		</div>
	)
}
