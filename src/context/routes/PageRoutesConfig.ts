class pageRoutesConfig {
	login = '/login'
	register = '/register'
	tradeAdmin = '/trade/admin'
	tradeParticipant = '/trade/participant'
	notFound = '/notFound'

	publicRoutes = [this.login, this.register]
}
export const routeConfig = new pageRoutesConfig()
