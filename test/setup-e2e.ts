import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import { DomainEvents } from '@/core/events/domain-events'

import { Redis } from 'ioredis'
import { envSchema } from '@/infra/env/env'


// criar banco para teste

config({ path: '.env', override: true })
config({ path: '.env.test', override: true })

const prisma = new PrismaClient()

const env = envSchema.parse(process.env) // traz no env as variaveis de ambiente

const redis = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  db: env.REDIS_DB,
})


function generateUniqueDatabaseURL(schemaId: string) {
 // if (!process.env.DATABASE_URL) {

 if (!env.DATABASE_URL) {
    throw new Error('Please provider a DATABASE_URL environment variable.')
  }

  // const url = new URL(process.env.DATABASE_URL)

  const url = new URL(env.DATABASE_URL)
  url.searchParams.set('schema', schemaId)
  return url.toString()
}

const schemaId = randomUUID()

beforeAll(async () => {
  const databaseURL = generateUniqueDatabaseURL(schemaId)

  process.env.DATABASE_URL = databaseURL // sobre escreve a url pela nova

  DomainEvents.shouldRun = false
  await redis.flushdb() // deleta o banco do teste

  execSync('npx prisma migrate deploy') // degitar comando no terminal
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  await prisma.$disconnect()
})
