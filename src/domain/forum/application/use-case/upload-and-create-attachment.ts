import { Either, left, right } from "@/core/either"

import { InvalidAttachmentTypeError } from "./erros/invalid-attachment-type"
import { Attachment } from "../../enterprise/entities/attachment"
import { AttachmentsRepository } from "../repositories/attachments-repository"
import { Uploader } from "../storage/uploader"
import { Injectable } from "@nestjs/common"

interface  UploadAndCreateAttachmentRequest {
    fileName: string
    fileType: string 
    body: Buffer
}

type UploadAndCreateAttachmentResponse = Either<
  InvalidAttachmentTypeError,
  {attachment: Attachment}
>

@Injectable()
export class UploadAndCreateAttachmentUseCase {
    constructor(
        private  attachmentsRepository : AttachmentsRepository,
        private uploader: Uploader
    ) {}

    async execute({
        fileName,
        fileType,
        body
    } : UploadAndCreateAttachmentRequest ): Promise<UploadAndCreateAttachmentResponse> {

        if (!/^(image\/(jpeg|png))$|^application\/pdf$/.test(fileType)) {
            return left(new InvalidAttachmentTypeError(fileType))
          }

   const { url } = await this.uploader.upload({
    fileName,
    body,
    fileType
   })

  const attachment = Attachment.create({
    title: fileName,
    Url: url,
  })

  await this.attachmentsRepository.create(attachment)

     return right({
        attachment
     })   
    }
}