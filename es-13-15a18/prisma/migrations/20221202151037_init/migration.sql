-- CreateTable
CREATE TABLE "Blabbering" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR(1000) NOT NULL,
    "length" INTEGER,
    "readingTimeM" INTEGER,
    "isSecret" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blabbering_pkey" PRIMARY KEY ("id")
);
