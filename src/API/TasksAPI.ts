import { db } from './firebase-config'
import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'

export default class TasksAPI {
  // Get All Tasks from firebase
  static async getAllTasks() {
    const tasksCollectionRef = collection(db, 'tasks')

    const response = await getDocs(tasksCollectionRef)

    const data = response.docs.map(doc => ({ ...doc.data(), id: doc.id }))

    return data
  }

  // Upload task to firebase
  static async uploadTask(data: any) {
    const tasksCollectionRef = collection(db, 'tasks')

    await addDoc(tasksCollectionRef, data)
  }

  // Update task in firebase
  static async updateTask(newData: any) {
    const taskDoc = doc(db, 'tasks', 'id')

    await updateDoc(taskDoc, newData)
  }

  // Delete task in firebase
  static async deleteTask(id: string) {
    const taskDoc = doc(db, 'tasks', id)

    await deleteDoc(taskDoc)
  }
}
