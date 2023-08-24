import { PrismaClient, Upload } from '@prisma/client'
import { FileType } from '../utils/types'
const prismaInstance = new PrismaClient()

const uploadModel = {
  async create(
    title: string,
    message: string,
    uploaderId: number,
    downloaderId: number,
    expiresAt: Date
  ): Promise<Upload> {
    const uploadFile = await prismaInstance.upload.create({
      data: {
        title,
        message,
        expiresAt,
        uploader: {
          connect: {
            id: uploaderId,
          },
        },
        downloader: {
          connect: {
            id: downloaderId,
          },
        },
      },
    })

    return uploadFile
  },

  async update(uploadId: number, files: FileType[]): Promise<Upload> {
    const updateUpload = await prismaInstance.upload.update({
      where: {
        id: uploadId,
      },
      data: {
        files: {
          createMany: {
            data: files,
          },
        },
      },
    })
    return updateUpload
  },
}

export default uploadModel
