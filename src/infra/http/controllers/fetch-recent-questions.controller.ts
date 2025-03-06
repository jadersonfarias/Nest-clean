import { BadRequestException, Controller, Get, Query } from '@nestjs/common'

import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { z } from 'zod'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-case/fetch-recent-questions'

import { QuestionPresenter } from '../presenters/question-presenter'

const pageQueryParamShema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamShema)

type PageQueryParamShema = z.infer<typeof pageQueryParamShema>

@Controller('/questions')
export class FetchRecentQuestionsController {
  constructor(private fetchRecentQuestions: FetchRecentQuestionsUseCase) {}

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamShema) {
    const result = await this.fetchRecentQuestions.execute({
      page,
    })
    if (result.isLeft()) {
      throw new BadRequestException()
    }
    const questions = result.value.questions
    return { questions: questions.map(QuestionPresenter.toHTTP) }
  }
}
