import { AuthContext, AuthContextType } from '@context/AuthContext'
import { routeConfig } from '@routes/PageRoutesConfig'
import { ProtectedRoutes } from '@routes/ProtectedRoute'
import { useContext } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { Login } from '@screens/auth/login/Login'
import { Register } from '@screens/auth/register/Register'
import Home from '@screens/home/Home'
import NotFound from '@screens/not-found/NotFound'
import Trade from '@screens/trade/Trade'

export const App = () => {
	const { currentUser } = useContext<AuthContextType | null>(AuthContext)

	return (
		<Router>
			<Routes>
				<Route
					path={routeConfig.tradeParticipant}
					element={
						<ProtectedRoutes isAuthenticated={currentUser}>
							<Trade />
						</ProtectedRoutes>
					}
				/>
				<Route path={routeConfig.home} element={<Home />} />

				<Route path={routeConfig.login} element={<Login />} />
				<Route path={routeConfig.register} element={<Register />} />

				<Route path='*' element={<NotFound />} />
			</Routes>
		</Router>
	)
}
