import { useNavigate } from 'react-router-dom'

import { routeConfig } from './PageRoutesConfig'

interface ProtectedRoutesTypes {
	children: React.ReactNode
	isAuthenticated: boolean
}
export function ProtectedRoutes({
	children,
	isAuthenticated
}: ProtectedRoutesTypes) {
	const navigate = useNavigate()
	const path = window.location.pathname

	if (routeConfig.publicRoutes.includes(path) || isAuthenticated) {
		return children
	} else {
		navigate(routeConfig.login)
	}
}
