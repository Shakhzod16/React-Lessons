import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyAMAxMrPhyffHq_xnTxsZCK2zuilpZuj5U',
	authDomain: 'lessons-88.firebaseapp.com',
	projectId: 'lessons-88',
	storageBucket: 'lessons-88.firebasestorage.app',
	messagingSenderId: '662806680901',
	appId: '1:662806680901:web:ce77aeb39bcdfa03b15a2c',
	measurementId: 'G-MBLPPBHPCE',
	databaseURL: 'https://lessons-88-default-rtdb.asia-southeast1.firebasedatabase.app',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const firebaseConfigError: string | null = null;

export const auth = getAuth(app);
export const realDB = getDatabase(app);
