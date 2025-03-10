-- CreateTable
CREATE TABLE "Group" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "ownerNickName" TEXT NOT NULL,
    "ownerPassword" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "photo" TEXT,
    "tags" TEXT[],
    "goalRep" INTEGER NOT NULL,
    "discordURL" TEXT NOT NULL,
    "invitationURL" TEXT NOT NULL,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "memberCount" INTEGER NOT NULL,
    "badgeId" UUID NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupTags" (
    "id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "groupId" UUID NOT NULL,

    CONSTRAINT "GroupTags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Members" (
    "id" UUID NOT NULL,
    "nickName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "groupId" UUID NOT NULL,

    CONSTRAINT "Members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Badge" (
    "badgeId" UUID NOT NULL,
    "member" BOOLEAN NOT NULL DEFAULT false,
    "record" BOOLEAN NOT NULL DEFAULT false,
    "likeCount" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "memberId" UUID,
    "recordId" UUID,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("badgeId")
);

-- CreateTable
CREATE TABLE "GroupBadge" (
    "groupBadgeId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "badgeId" UUID NOT NULL,
    "groupId" UUID NOT NULL,

    CONSTRAINT "GroupBadge_pkey" PRIMARY KEY ("groupBadgeId")
);

-- CreateTable
CREATE TABLE "Record" (
    "id" UUID NOT NULL,
    "nickName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "sports" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "distance" INTEGER NOT NULL,
    "photo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "memberId" UUID NOT NULL,
    "groupId" UUID NOT NULL,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("badgeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupTags" ADD CONSTRAINT "GroupTags_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Members" ADD CONSTRAINT "Members_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Badge" ADD CONSTRAINT "Badge_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Members"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Badge" ADD CONSTRAINT "Badge_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupBadge" ADD CONSTRAINT "GroupBadge_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("badgeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupBadge" ADD CONSTRAINT "GroupBadge_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
