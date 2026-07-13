import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL이 설정되어 있지 않습니다.')
}

const adapter = new PrismaPg({ connectionString })

export const prisma = new PrismaClient({ adapter })
