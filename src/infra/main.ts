import { NestFactory } from '@nestjs/core'
import { AppModule } from '@/infra/app.module'
// import { ConfigService } from '@nestjs/config'
// import { Env } from '@/infra/env'
import { EnvService } from './env/env.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
  })
  // const configService = app.get<ConfigService<Env, true>>(ConfigService)
  // const port = configService.get('PORT', { infer: true })

  const configService = app.get(EnvService)
  const port = configService.get('PORT')
  await app.listen(port)

  console.log(`🚀 Server is running on http://localhost:${port}`)
}
bootstrap()
