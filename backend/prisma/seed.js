import process from 'node:process'
import { prisma } from '../src/config/prisma.js'
import { hashPassword } from '../src/utils/passwords.js'
import { mockMovies } from './seed-data/mockMovies.js'
import { mockFundings } from './seed-data/mockFundings.js'

async function main() {
  await prisma.funding.deleteMany()
  await prisma.movie.deleteMany()

  await prisma.movie.createMany({
    data: mockMovies,
  })

  const movies = await prisma.movie.findMany({
    select: {
      id: true,
      title: true,
    },
  })

  const movieIdByTitle = new Map(movies.map((movie) => [movie.title, movie.id]))

  const fundingData = await Promise.all(
    mockFundings.map(async ({ movieTitle, password, ...funding }) => {
      const movieId = movieIdByTitle.get(movieTitle)

      if (!movieId) {
        throw new Error(`"${movieTitle}" 영화 데이터를 찾을 수 없습니다.`)
      }

      return {
        ...funding,
        movieId,
        passwordHash: await hashPassword(password),
      }
    }),
  )

  await prisma.funding.createMany({
    data: fundingData,
  })

  console.log(`${mockMovies.length}개의 영화 더미 데이터를 추가했습니다.`)
  console.log(`${mockFundings.length}개의 펀딩 더미 데이터를 추가했습니다.`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
