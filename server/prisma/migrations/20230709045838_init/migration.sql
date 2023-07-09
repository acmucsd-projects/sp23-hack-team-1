-- CreateTable
CREATE TABLE "room" (
    "id" SERIAL NOT NULL,
    "roomCode" TEXT NOT NULL,
    "boardState" JSONB NOT NULL,

    CONSTRAINT "room_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "room_roomCode_key" ON "room"("roomCode");
