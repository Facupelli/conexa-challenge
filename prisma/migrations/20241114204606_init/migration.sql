-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roles" TEXT[],

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movies" (
    "id" SERIAL NOT NULL,
    "externalId" INTEGER,
    "title" TEXT NOT NULL,
    "episodeId" INTEGER NOT NULL,
    "openingCrawl" TEXT NOT NULL,
    "director" TEXT NOT NULL,
    "producer" TEXT NOT NULL,
    "releaseDate" TEXT NOT NULL,
    "species" TEXT[],
    "starships" TEXT[],
    "vehicles" TEXT[],
    "characters" TEXT[],
    "planets" TEXT[],
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "movies_externalId_key" ON "movies"("externalId");

-- CreateIndex
CREATE INDEX "movies_title_idx" ON "movies"("title");
