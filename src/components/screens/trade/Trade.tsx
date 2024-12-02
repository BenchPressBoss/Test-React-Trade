import { AuthContext } from '@context/AuthContext'
import { routeConfig } from '@routes/PageRoutesConfig'
// Импорт настроенного Firebase
import {
	get,
	onValue,
	push,
	ref,
	runTransaction,
	set,
	update
} from 'firebase/database'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './Trade.module.scss'
import { databaseApp } from '@/config/config.firebase'

function Trade() {
	const { logout, currentUser } = useContext(AuthContext)
	const [isAdmin, setIsAdmin] = useState(false)
	const [auctionState, setAuctionState] = useState({
		currentPrice: 0,
		activeUser: '',
		status: 'active'
	})
	const [isParticipant, setIsParticipant] = useState(false)
	const navigate = useNavigate()
	const participantsArray = [
		{
			id: 1,
			email: 'maxim227228@gmail.com'
		},
		{
			id: 2,
			email: 'test1@test.com'
		}
	]
	// Функция для повышения цены и передачи хода
	const priceUp = async () => {
		const auctionRef = ref(databaseApp, 'auction')
		const participantRef = ref(databaseApp, 'participants')
		try {
			const snapshot = await get(participantRef)

			if (!snapshot.exists()) {
				return
			}

			const participants = snapshot.val()
			const participantsArray = Object.values(participants)

			if (participantsArray.length === 0) {
				alert('Нет участников в аукционе!')
				return
			}
			if (auctionState.status === 'active') {
				await runTransaction(auctionRef, currentData => {
					if (!currentData) {
						return {
							currentPrice: 0,
							activeUser: participantsArray[0].user,
							status: 'active'
						}
					} else {
						const currentIndex = participantsArray.findIndex(
							participant => participant.user === currentData.activeUser
						)
						const nextIndex = (currentIndex + 1) % participantsArray.length
						const nextUser = participantsArray[nextIndex].user

						return {
							...currentData,
							currentPrice: currentData.currentPrice + 10,
							activeUser: nextUser
						}
					}
				})
			} else {
				alert('Аукцион не активен!')
			}
		} catch (error) {
			console.error('Ошибка при обновлении аукциона:', error)
			alert('Произошла ошибка при увеличении цены.')
		}
	}

	const enterTrade = async () => {
		const currentParticipant = currentUser.email
		const participantRef = ref(databaseApp, 'participants')

		try {
			const snapshot = await get(participantRef)

			if (snapshot.exists()) {
				const participants = snapshot.val()

				const emailExists = Object.values(participants).some(
					entry => entry.user === currentParticipant
				)

				if (emailExists) {
					alert('хватит! Ты уже участвуешь в аукционе!')
					return
				}
			}
			await push(participantRef, {
				user: currentParticipant
			})
			alert('Вы участвуете в аукционе')

			setIsParticipant(true)
		} catch (error) {
			alert('Произошла ошибка при попытке добавления участника в аукцион')
			console.error('Ошибка при добавлении участника:', error)
		}
	}
	// Подписка на изменения аукциона
	useEffect(() => {
		const auctionRef = ref(databaseApp, 'auction')
		const unsubscribe = onValue(auctionRef, snapshot => {
			const data = snapshot.val()
			if (data) setAuctionState(data)
		})
		return () => unsubscribe()
	}, [])

	const handleLogout = () => {
		logout()
		navigate(routeConfig.home)
	}

	const singInAdmin = () => {
		const password = prompt('Введите пароль для админа:')
		if (password === 'п') {
			setIsAdmin(true)
		} else {
			setIsAdmin(false)
		}
	}

	// Запуск аукциона
	const startAuction = () => {
		const auctionRef = ref(databaseApp, 'auction')
		set(auctionRef, {
			currentPrice: 0,
			activeUser: '',
			status: 'active'
		})

		alert('Аукцион начался!')
	}

	// Завершение аукциона
	const endAuction = () => {
		const auctionRef = ref(databaseApp, 'auction')
		update(auctionRef, {
			status: 'ended'
		})
		alert('Аукцион завершён!')
	}

	return (
		<>
			<div className={styles.userBlock}>
				<p>Текущий пользователь: {currentUser?.email || 'Гость'}</p>
				<button onClick={handleLogout}>Выйти</button>
				<button onClick={singInAdmin}>
					{isAdmin ? 'Выйти из режима админа' : 'Войти как админ'}
				</button>
				<button onClick={isParticipant ? handleLogout : enterTrade}>
					{isParticipant ? 'Выйти из аукциона' : 'Войти в аукцион'}
				</button>
			</div>
			<div className={styles.tradeBlock}>
				<h1>Текущая цена: {auctionState.currentPrice} руб.</h1>
				<h2>
					Активный пользователь: {auctionState.activeUser || 'Нет данных'}
				</h2>
				<h3>
					Статус: {auctionState.status === 'active' ? 'Активен' : 'Неактивен'}
				</h3>
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
							<td className={styles.greenText}>{auctionState.currentPrice}</td>
							<td className={styles.greenText}>0 руб.</td>
							<td className={styles.greenText}>0 руб.</td>
							<td className={styles.greenText}>0 руб.</td>
						</tr>
					</tbody>
				</table>
				{isAdmin ? (
					<>
						<button
							onClick={startAuction}
							disabled={auctionState.status === 'active'}
						>
							Начать аукцион
						</button>
						<button
							onClick={endAuction}
							disabled={auctionState.status !== 'active'}
						>
							Завершить аукцион
						</button>
					</>
				) : (
					<>
						<button
							onClick={priceUp}
							disabled={
								auctionState.status !== 'active' ||
								auctionState.activeUser !== currentUser.email
							}
						>
							Поднять цену
						</button>
						<p>Ваш ход завершён автоматически после повышения цены.</p>
					</>
				)}
			</div>
		</>
	)
}

export default Trade
