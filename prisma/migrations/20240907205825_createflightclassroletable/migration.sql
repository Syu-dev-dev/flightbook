-- CreateTable
CREATE TABLE "FlightClassRole" (
    "id" SERIAL NOT NULL,
    "airlineId" INTEGER NOT NULL,
    "flightNumberId" INTEGER NOT NULL,
    "departureId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FlightClassRole_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FlightClassRole" ADD CONSTRAINT "FlightClassRole_airlineId_fkey" FOREIGN KEY ("airlineId") REFERENCES "Airline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlightClassRole" ADD CONSTRAINT "FlightClassRole_flightNumberId_fkey" FOREIGN KEY ("flightNumberId") REFERENCES "FlightNumber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlightClassRole" ADD CONSTRAINT "FlightClassRole_departureId_fkey" FOREIGN KEY ("departureId") REFERENCES "Departure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
