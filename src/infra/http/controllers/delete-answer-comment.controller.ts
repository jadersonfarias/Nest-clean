import {
    BadRequestException,
    Controller,
    Delete,
    HttpCode,
    Param,
  } from '@nestjs/common'
  import { CurrentUser } from '@/infra/auth/current-user-decorator'
  import { TokenPayload } from '@/infra/auth/jwt.strategy'
  import { DeleteAnswerCommentUseCase } from '@/domain/forum/application/use-case/delete-answer-comment'
  @Controller('/answers/comments/:id')
  export class DeleteAnswerCommentController {
    constructor(private deleteAnswerComment: DeleteAnswerCommentUseCase) {}
    @Delete()
    @HttpCode(204)
    async handle(
      @CurrentUser() user: TokenPayload,
      @Param('id') answerCommentId: string,
    ) {
      const userId = user.sub
      const result = await this.deleteAnswerComment.execute({
        answerCommentId,
        authorId: userId,
      })
      if (result.isLeft()) {
        throw new BadRequestException()
      }
    }
  }