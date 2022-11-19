import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

/** Конфигурация для доступа к Firebase */
const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: 'to-do-list-1ff69.firebaseapp.com',
  databaseURL:
    'https://to-do-list-1ff69-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'to-do-list-1ff69',
  storageBucket: 'to-do-list-1ff69.appspot.com',
  messagingSenderId: '714801661070',
  appId: '1:714801661070:web:fab6a420ff9ebdd95db5df',
  measurementId: 'G-DFLYE8SZND'
}

/** Приложение Firebase */
const app = initializeApp(firebaseConfig)

/** Firebase Firestore */
export const db = getFirestore(app)

/** Firebase Storage */
export const storage = getStorage(app)
