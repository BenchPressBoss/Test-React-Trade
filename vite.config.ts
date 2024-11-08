// vite.config.js
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@components': path.resolve(__dirname, './src/components'),
			'@styles': path.resolve(__dirname, './src/assets/styles'),
			'@routes': path.resolve(__dirname, './src/routes'),
			'@context': path.resolve(__dirname, './src/context'),
			'@screens': path.resolve(__dirname, './src/components/screens'),
			'@config': path.resolve(__dirname, './src/config')
		}
	}
})
