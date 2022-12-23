import { db } from './_firebase-config'
import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  orderBy,
  query
} from 'firebase/firestore'

import {
  DoneTaskParams,
  UpdateTaskParams,
  UploadTaskParams
} from '../redux/tasks/types'
import FileAPI from './FileAPI'

/**
 * Класс с методами для взаимодействия с Firestore (Firebase)
 */
export default class TasksAPI {
  /**
   * Метод для получения всех задач из коллекции Firestore
   * @return {TaskItem[]} массив с задачами из заданной коллекции
   */
  static async fetchGetAllTasks() {
    /** Создание ссылки на коллекцию 'tasks' */
    const tasksCollectionRef = collection(db, 'tasks')

    /** Получение коллекции задач по заданной ссылке */
    const response = await getDocs(
      query(tasksCollectionRef, orderBy('timestamp', 'asc'))
    )

    /** Распаковка полученных данных в массив */
    const data = response.docs.map(doc => ({ ...doc.data(), id: doc.id }))

    return data
  }

  /**
   * Метод для загрузки новой задачи в коллекцию Firestore
   * @param {UploadTaskParams} data данные для создания задачи
   * @return {TaskItem} новая загруженная задача из коллекции
   */
  static async fetchUploadTask(data: UploadTaskParams) {
    /** Деструктуризация полученных данных из параметра */
    const { title, description, targetDate, fileURL } = data

    /** Создание ссылки на коллекцию 'tasks' */
    const tasksCollectionRef = collection(db, 'tasks')

    /** Отправка задачи в коллекцию по заданной ссылке */
    const response = await addDoc(tasksCollectionRef, {
      title,
      description,
      targetDate,
      fileURL,
      done: false,
      timestamp: serverTimestamp()
    })

    /** Создание ссылки на созданную задачу в коллекции 'tasks' */
    const newTaskDoc = doc(db, 'tasks', response.id)

    /** Получение задачи по заданной ссылке */
    const newTask = await getDoc(newTaskDoc)

    return { ...newTask.data(), id: newTask.id }
  }

  /**
   * Метод для обновления полей задачи из коллекции Firestore
   * @param {TaskItem} newData данные для изменения полей задачи
   */
  static async fetchUpdateTask(newData: UpdateTaskParams) {
    /** Деструктуризация полученных данных из параметра */
    const { id, title, description, targetDate, fileURL, file } = newData

    // Если новый файл не выбран – ссылка остается прежней
    let upLoadedFileURL = fileURL

    /** Если новый файлы выбран – загрузка нового прикрепленного файла в хранилище Storage */
    if (file) {
      const newFileURL = await FileAPI.fetchUploadFile({ file })
      upLoadedFileURL = newFileURL
    }

    /** Создание ссылки на задачу в коллекции 'tasks' по id */
    const taskDoc = doc(db, 'tasks', id)

    /** Обновление полей задачи по ссылки */
    await updateDoc(taskDoc, {
      title: title,
      description: description,
      targetDate: targetDate,
      fileURL: upLoadedFileURL
    })
  }

  /**
   * Метод для удаления задачи из коллекции Firestore
   * @param {string} id задачи, которую необходимо удалить
   */
  static async fetchDeleteTask(id: string) {
    /** Создание ссылки на задачу в коллекции 'tasks' по id */
    const taskDoc = doc(db, 'tasks', id)

    /** Удаление задачи из коллекции по заданной ссылки */
    await deleteDoc(taskDoc)
  }

  /**
   * Метод для изменения состояния поля 'done' в задачи из коллекции Firestore
   * @param {DoneTaskParams} newData данные для изменения состояния выполения задачи
   * @return {string} id измененной задачи
   */
  static async fetchDoneTask(newData: DoneTaskParams) {
    /** Деструктуризация полученных данных из параметра */
    const { id, done } = newData

    /** Создание ссылки на задачу в коллекции 'tasks' по id */
    const taskDoc = doc(db, 'tasks', id)

    /** Обновление поля 'done' в задаче по заданной ссылки */
    await updateDoc(taskDoc, { done: !done })

    return id
  }
}
