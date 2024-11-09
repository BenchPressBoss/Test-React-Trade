import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { routeConfig } from './PageRoutesConfig'

interface ProtectedRoutesTypes {
	children: React.ReactNode
	isAuthenticated: boolean
}

export const ProtectedRoutes = ({
	children,
	isAuthenticated
}: ProtectedRoutesTypes) => {
	const navigate = useNavigate()
	const path = window.location.pathname

	useEffect(() => {
		if (!isAuthenticated && !routeConfig.publicRoutes.includes(path)) {
			navigate(routeConfig.login)
		}
	}, [isAuthenticated, path, navigate])

	return isAuthenticated || routeConfig.publicRoutes.includes(path) ? (
		<>{children}</>
	) : null
}
