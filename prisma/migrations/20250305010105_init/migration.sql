-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "groupName" TEXT NOT NULL,
    "nickName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "photo" TEXT,
    "tag" TEXT,
    "goalCount" INTEGER NOT NULL,
    "discordURL" TEXT NOT NULL,
    "invitationURL" TEXT NOT NULL,
    "recommendation" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Group_groupName_key" ON "Group"("groupName");
