import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Env } from './env'

@Injectable() // busca as  variaveis ambiente
export class EnvService {
  constructor(private configService: ConfigService<Env, true>) {}

  get<T extends keyof Env>(key: T) {
    // T é um generico que o usuario manda para dizer que o formato deve ser o mesmo que o usuario mandou
   // return this.configService.get<T>(key, { infer: true })
   return this.configService.get<Env[T]>(key, { infer: true }) as Env[T]
  }
}
