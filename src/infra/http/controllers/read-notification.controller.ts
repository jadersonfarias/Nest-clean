
import { ReadNotificationUseCase } from "@/domain/notification/application/use-cases/read-notification";
import { BadRequestException, Controller, HttpCode, Param, Patch } from "@nestjs/common";
import { QuestionDetailsPresenter } from "../presenters/question-details-presenter";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { TokenPayload } from "@/infra/auth/jwt.strategy";


@Controller('/notifications/:notificationId/read')
export class ReadNotificationController {
    constructor(private readNotification: ReadNotificationUseCase) {}

    @Patch()
    @HttpCode(204)
    async handle(
        @CurrentUser() user: TokenPayload,
        @Param('notificationId') notificationId: string,
    ) {
      const result = await this.readNotification.execute({
        notificationId,
        recipientId: user.sub,
      })

      if (result.isLeft()) {
        throw new BadRequestException()
      }

    }

}