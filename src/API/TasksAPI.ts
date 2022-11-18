import { db, storage } from './firebase-config'
import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

import {
  DoneTaskParams,
  TaskItem,
  UploadTaskParams
} from '../redux/tasks/types'

import { v4 } from 'uuid'

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
    const { title, description, targetDate, file } = data
    let fileURL = null

    if (file) {
      const imageRef = ref(storage, `images/${file.name + v4()}`)
      const response = await uploadBytes(imageRef, file)

      const upLoadedImageRef = ref(storage, response.metadata.fullPath)
      const upLoadedFileURL = await getDownloadURL(upLoadedImageRef)
      fileURL = upLoadedFileURL
    }

    const tasksCollectionRef = collection(db, 'tasks')
    const response = await addDoc(tasksCollectionRef, {
      title,
      description,
      targetDate,
      done: false,
      fileURL
    })
    const newTaskDoc = doc(db, 'tasks', response.id)
    const newTask = await getDoc(newTaskDoc)

    return { ...newTask.data(), id: newTask.id, fileURL: fileURL }
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
