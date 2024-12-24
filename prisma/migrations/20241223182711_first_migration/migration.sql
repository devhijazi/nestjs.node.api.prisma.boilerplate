-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inspections" (
    "id" TEXT NOT NULL,
    "inspectionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inspectorSignature" TEXT,
    "driver" TEXT NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "brandModel" TEXT NOT NULL,
    "yearModel" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "observations" TEXT,
    "tireSpare" INTEGER NOT NULL,
    "glassMirrors" INTEGER NOT NULL,
    "taillights" INTEGER NOT NULL,
    "headlights" INTEGER NOT NULL,
    "directionSignal" INTEGER NOT NULL,
    "frontRearSeats" INTEGER NOT NULL,
    "seatBelt" INTEGER NOT NULL,
    "airConditioning" INTEGER NOT NULL,
    "trunk" INTEGER NOT NULL,
    "alcoholGelMask" INTEGER NOT NULL,
    "driverAcceptanceDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "driverSignature" TEXT,
    "driverSignatureDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "inspections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "problems" (
    "id" TEXT NOT NULL,
    "inspectionId" TEXT NOT NULL,
    "part" INTEGER NOT NULL,

    CONSTRAINT "problems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "problem_images" (
    "id" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "problem_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "inspections" ADD CONSTRAINT "inspections_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problems" ADD CONSTRAINT "problems_inspectionId_fkey" FOREIGN KEY ("inspectionId") REFERENCES "inspections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problem_images" ADD CONSTRAINT "problem_images_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "problems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
