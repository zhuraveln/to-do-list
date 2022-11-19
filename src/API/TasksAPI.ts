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
import { v4 } from 'uuid'

import {
  DoneTaskParams,
  TaskItem,
  UploadTaskParams
} from '../redux/tasks/types'

/**
 * Класс с методами для взаимодейтсвия с Firestore и Storage (Firebase)
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
    const response = await getDocs(tasksCollectionRef)

    /** Распаковка полученных данных в массив */
    const data = response.docs.map(doc => ({ ...doc.data(), id: doc.id }))

    return data
  }

  /**
   * Метод для загрузки новой задачи и прикрепленного файла в коллекцию Firestore и хранилище Storage
   * @param {UploadTaskParams} data данные для создания задачи
   * @return {TaskItem} новая загруженная задача из коллекции
   */
  static async fetchUploadTask(data: UploadTaskParams) {
    /** Деструктуризация полученных данных из параметра */
    const { title, description, targetDate, file } = data

    /** Создание переменной для загруженного файла в Storage */
    let fileURL = null

    /** Загрузка файла в Storage если пользователь его указал */
    if (file) {
      /** Создание ссылки на папку 'images' в Storage*/
      const imageRef = ref(storage, `images/${file.name + v4()}`)

      /** Отправка файла по заданной ссылке */
      const response = await uploadBytes(imageRef, file)

      /** Создание ссылки в Storage для загруженного файла */
      const upLoadedImageRef = ref(storage, response.metadata.fullPath)

      /** Получение URL на загруженный файл */
      const upLoadedFileURL = await getDownloadURL(upLoadedImageRef)

      /** Присвоение полученного URL переменной fileURL*/
      fileURL = upLoadedFileURL
    }

    /** Создание ссылки на коллекцию 'tasks' */
    const tasksCollectionRef = collection(db, 'tasks')

    /** Отправка задачи в коллекцию по заданной ссылке */
    const response = await addDoc(tasksCollectionRef, {
      title,
      description,
      targetDate,
      done: false,
      fileURL
    })

    /** Создание ссылки на созданную задачу в коллекции 'tasks' */
    const newTaskDoc = doc(db, 'tasks', response.id)

    /** Получение задачи по заданной ссылке */
    const newTask = await getDoc(newTaskDoc)

    return { ...newTask.data(), id: newTask.id, fileURL: fileURL }
  }

  /**
   * Метод изменения состояния поля 'done' в задачи из коллекции Firestore
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

  /**
   * Метод обновления полей задачи из коллекции Firestore
   * @param {TaskItem} newData данные для изменения полей задачи
   */
  static async fetchUpdateTask(newData: TaskItem) {
    /** Деструктуризация полученных данных из параметра */
    const { id, title, description, targetDate } = newData

    /** Создание ссылки на задачу в коллекции 'tasks' по id */
    const taskDoc = doc(db, 'tasks', id)

    /** Обновление полей задачи по ссылки */
    await updateDoc(taskDoc, {
      title: title,
      description: description,
      targetDate: targetDate
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
}
