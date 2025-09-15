import { scyllaApi } from 'boot/axios'

type SuccessUpload = {
  data: {
    message: string,
    data: {
      url: string
    },
    request_id: string
  }
}

export const upload = async (dataPhoto: File | null, dataFile: File | null): Promise<SuccessUpload> => {
  const formData = new FormData()
  formData.append('Folder', dataFile as Blob)
  formData.append('file', dataPhoto as Blob)
  return await scyllaApi.post('master/v1/files/uploads', formData)
}
