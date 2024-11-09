import { AuthContext } from '@context/AuthContext'
import { routeConfig } from '@routes/PageRoutesConfig'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './Trade.module.scss'

function Trade() {
	const { logout, currentUser } = useContext(AuthContext)

	const navigate = useNavigate()

	const handleUser = () => {
		console.log(currentUser)
	}
	const handleLogout = () => {
		logout()
		navigate(routeConfig.home)
	}
	return (
		<>
			<div className={styles.userBlock}>
				<button onClick={handleUser}>get user</button>
				<button onClick={handleLogout}>Выйти</button>
			</div>
			<table className={styles.paymentTerms}>
				<thead>
					<tr>
						<th>Параметры и требования</th>
						<th>User 1</th>
						<th>User 2</th>
						<th>User 3</th>
						<th>User 4</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Стоимость изготовления лота, руб. (без НДС)</td>
						<td className={styles.greenText}>2,475,000 руб.</td>
						<td className={styles.greenText}>2,475,000 руб.</td>
						<td className={styles.greenText}>2,475,000 руб.</td>
						<td className={styles.greenText}>2,475,000 руб.</td>
					</tr>
				</tbody>
			</table>
			<button>Поднять цену</button>
			<button>Передать ход следующему</button>
		</>
	)
}

export default Trade
