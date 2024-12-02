import { routeConfig } from '@routes/PageRoutesConfig'
import { useNavigate } from 'react-router-dom'

import styles from './Home.module.scss'

function Home() {
	const navigate = useNavigate()

	const handleNavigate = (path: string) => {
		navigate(routeConfig.login)
	}

	return (
		<div className={styles.wrapper}>
			<button onClick={() => handleNavigate(routeConfig.login)}>Sign in</button>
			<br />
			<button onClick={() => handleNavigate(routeConfig.register)}>
				Sing uppp
			</button>
		</div>
	)
}

export default Home
