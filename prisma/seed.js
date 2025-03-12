import { PrismaClient } from '@prisma/client';
import { GROUPS, RECORDS } from './mock.js';

const prisma = new PrismaClient();

async function main() {
  await prisma.group.deleteMany();
  await prisma.members.deleteMany();
  await prisma.record.deleteMany();
  
  console.log('🔄 Seeding database...');

  // 2️⃣ 그룹 데이터 삽입
  await prisma.group.createMany({
    data: GROUPS,
    skipDuplicates: true,
  });

  console.log('✅ Groups inserted successfully!');

  // 3️⃣ 멤버 데이터 삽입 (이미 groupId가 올바르므로 그대로 사용)
  await prisma.members.createMany({
    data: RECORDS.map(({ nickName, password, memberId, groupId }) => ({
      id: memberId,
      nickName,
      password,
      groupId, // 이미 mock.js에서 올바른 ID로 수정됨
    })),
    skipDuplicates: true,
  });

  console.log('✅ Members inserted successfully!');

  // 4️⃣ 기록 데이터 삽입 (이미 memberId, groupId가 올바르므로 그대로 사용)
  await prisma.record.createMany({
    data: RECORDS.map(({ password, ...record }) => ({
      ...record,
      sports: record.sports.toUpperCase(), // enum 값 대문자로 변환
    })),
    skipDuplicates: true,
  });

  console.log('✅ Records inserted successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error('❌ Error seeding database:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
