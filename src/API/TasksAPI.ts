import { db } from './firebase-config'
import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'
import {
  DoneTaskParams,
  TaskItem,
  UploadTaskParams
} from '../redux/tasks/types'

export default class TasksAPI {
  // Get All Tasks from firebase
  static async fetchGetAllTasks() {
    const tasksCollectionRef = collection(db, 'tasks')

    const response = await getDocs(tasksCollectionRef)

    const data = response.docs.map(doc => ({ ...doc.data(), id: doc.id }))

    return data
  }

  // Upload task to firebase
  static async fetchUploadTask(data: UploadTaskParams) {
    const tasksCollectionRef = collection(db, 'tasks')

    const response = await addDoc(tasksCollectionRef, { ...data, done: false })

    const newTaskDoc = doc(db, 'tasks', response.id)
    const newTask = await getDoc(newTaskDoc)

    return { ...newTask.data(), id: newTask.id }
  }

  // Set done Task
  static async fetchDoneTask(newData: DoneTaskParams) {
    const { id, done } = newData
    const taskDoc = doc(db, 'tasks', id)

    await updateDoc(taskDoc, { done: !done })

    return id
  }

  // Update task in firebase
  static async fetchUpdateTask(newData: TaskItem) {
    const { id, title, description, targetDate } = newData

    const taskDoc = doc(db, 'tasks', id)

    await updateDoc(taskDoc, {
      title: title,
      description: description,
      targetDate: targetDate
    })
  }

  // Delete task in firebase
  static async fetchDeleteTask(id: string) {
    const taskDoc = doc(db, 'tasks', id)

    await deleteDoc(taskDoc)
  }
}
