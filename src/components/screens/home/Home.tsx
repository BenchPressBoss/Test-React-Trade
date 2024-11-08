import { routeConfig } from '@routes/PageRoutesConfig'
import { Link } from 'react-router-dom'

function Home() {
	return (
		<div>
			<Link to={routeConfig.login}>Вход</Link>
			<br />
			<Link to={routeConfig.register}>Регистрация</Link>
		</div>
	)
}

export default Home
