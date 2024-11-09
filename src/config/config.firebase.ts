import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, serverTimestamp } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: 'AIzaSyB-J2cEEd_EJgCezsD8S5o9O6laiIp76xw',
	authDomain: 'test-react-trade-c1070.firebaseapp.com',
	databaseURL: 'https://test-react-trade-c1070-default-rtdb.firebaseio.com',
	projectId: 'test-react-trade-c1070',
	storageBucket: 'test-react-trade-c1070.firebasestorage.app',
	messagingSenderId: '353225531145',
	appId: '1:353225531145:web:0a8828e3d8676d3ab0bdd8',
	measurementId: 'G-DWMDZBJX38'
}

const app = initializeApp(firebaseConfig)

export const timestamp = serverTimestamp
export const firestoreApp = getFirestore(app)
export const storageApp = getStorage(app)
export const authApp = getAuth(app)
