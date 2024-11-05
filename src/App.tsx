import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { Login } from '@components/screens/auth/login/Login'
import { Register } from '@components/screens/auth/register/Register'
import NotFound from '@components/screens/not-found/NotFound'

import Trade from './components/screens/trade/Trade'
import { AuthProvider } from './context/AuthProvider'
import { routeConfig } from './routes/PageRoutesConfig'
import { ProtectedRoutes } from './routes/ProtectedRoute'

function App() {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route
						path={routeConfig.tradeAdmin}
						element={
							<ProtectedRoutes isAuthenticated={true}>
								<Trade isAdmin={true} />
							</ProtectedRoutes>
						}
					/>

					<Route
						path={routeConfig.tradeParticipant}
						element={
							<ProtectedRoutes isAuthenticated={true}>
								<Trade isAdmin={false} />
							</ProtectedRoutes>
						}
					/>

					<Route path={routeConfig.login} element={<Login />} />
					<Route path={routeConfig.register} element={<Register />} />

					<Route path='*' element={<NotFound />} />
				</Routes>
			</Router>
		</AuthProvider>
	)
}

export default App
