import { storage } from './_firebase-config'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'

import { UploadFileParams } from '../redux/tasks/types'

/**
 * Класс с методами для взаимодействия со Storage (Firebase)
 */
export default class FileAPI {
  /**
   * Метод для загрузки прикрепленного файла в хранилище Storage
   * @param {UploadFileParams} data файл для загрузки в хранилище
   * @return {upLoadedFileURL} ссылка на загруженный файл
   */
  static async fetchUploadFile(data: UploadFileParams) {
    /** Деструктуризация полученных данных из параметра */
    const { file } = data

    /** Проверка на существование файла */
    if (file) {
      /** Создание ссылки на папку 'images' в Storage*/
      const imageRef = ref(storage, `images/${file.name + v4()}`)

      /** Отправка файла по заданной ссылке */
      const response = await uploadBytes(imageRef, file)

      /** Создание ссылки в Storage для загруженного файла */
      const upLoadedImageRef = ref(storage, response.metadata.fullPath)

      /** Получение URL на загруженный файл */
      const upLoadedFileURL = await getDownloadURL(upLoadedImageRef)

      return upLoadedFileURL
    }

    return null
  }
}
