import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

/** Конфигурация для доступа к Firebase */
const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTHDOMAIN}`,
  databaseURL: `${process.env.REACT_APP_DATABASEURL}`,
  projectId: `${process.env.REACT_APP_PROJECTID}`,
  storageBucket: `${process.env.REACT_APP_STORAGEBUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGINGSENDERID}`,
  appId: `${process.env.REACT_APP_APPID}`,
  measurementId: `${process.env.REACT_APP_MEASUREMENTID}`
}

/** Приложение Firebase */
const app = initializeApp(firebaseConfig)

/** Firebase Firestore */
export const db = getFirestore(app)

/** Firebase Storage */
export const storage = getStorage(app)
