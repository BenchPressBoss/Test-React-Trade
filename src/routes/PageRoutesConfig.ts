class pageRoutesConfig {
	readonly home: string = '/'
	readonly login: string = '/login'
	readonly register: string = '/register'
	readonly tradeAdmin: string = '/trade/admin'
	readonly tradeParticipant: string = '/trade/participant'
	readonly notFound: string = '/notFound'

	publicRoutes = [this.login, this.register]
}
export const routeConfig = new pageRoutesConfig()
