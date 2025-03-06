import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleDestroy, OnModuleInit
{
  constructor() {
    super({
      log: ['warn', 'error'],
    })
  }

  onModuleDestroy() {
    // quando instaciado
    return this.$connect()
  }

  onModuleInit() {
    // quando for destruido
    return this.$disconnect
  }
}
