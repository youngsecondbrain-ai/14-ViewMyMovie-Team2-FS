-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('ACTION', 'DRAMA', 'ROMANCE', 'THRILLER', 'COMEDY', 'HORROR', 'SF', 'FANTASY', 'ANIMATION', 'DOCUMENTARY');

-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "genre" "Genre" NOT NULL,
    "posterImageUrl" TEXT,
    "accumulatedFundingAmount" BIGINT NOT NULL DEFAULT 0,
    "targetFundingAmount" BIGINT NOT NULL,
    "fundingDeadline" TIMESTAMP(3) NOT NULL,
    "expectationScore" INTEGER NOT NULL DEFAULT 0,
    "selectionCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Funding" (
    "id" TEXT NOT NULL,
    "movieId" TEXT,
    "nickname" TEXT NOT NULL,
    "fundingAmount" BIGINT NOT NULL,
    "comment" TEXT,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Funding_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Funding" ADD CONSTRAINT "Funding_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;
