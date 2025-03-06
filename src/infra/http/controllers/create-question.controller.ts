import { Body, Controller, Post } from '@nestjs/common' // UseGuards quando colocado o guard na rota
import { CurrentUser } from '@/infra/auth/current-user-decorator'
// import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { TokenPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
// import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { z } from 'zod'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-case/create-question'

const createQuestionBodySchemas = z.object({
  title: z.string(),
  content: z.string(),
  attachments: z.array(z.string().uuid()),
})

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchemas>

@Controller('/questions')
// @UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private createQuestion: CreateQuestionUseCase) {}

  @Post()
  async handle(
    @CurrentUser() user: TokenPayload,
    @Body(new ZodValidationPipe(createQuestionBodySchemas))
    body: CreateQuestionBodySchema,
  ) {
    const { content, title, attachments} = body
    const userId = user.sub

    await this.createQuestion.execute({
      title,
      content,
      authorId: userId,
      attachmentsIds: attachments,
    })
    // const slug = this.convertToSlug(title)

    // await this.prisma.question.create({
    //   data: {
    //     authorId: userId,
    //     title,
    //     content,
    //     slug,
    //   },
    // })
  }
}
//   private convertToSlug(title: string): string {
//     return title
//       .toLowerCase()
//       .normalize('NFD')
//       .replace(/[\u0300-\u036f]/g, '')
//       .replace(/[^\w\s-]/g, '')
//       .replace(/\s+/g, '-')
//   }
// }
//
