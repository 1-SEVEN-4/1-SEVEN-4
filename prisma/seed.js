import prisma from '../src/config/prisma.js';
import { GROUP, MEMBER, RECORD } from './mock.js';

async function main() {
  await prisma.group.deleteMany();
  await prisma.members.deleteMany();
  await prisma.record.deleteMany();

  console.log('🔄 Seeding database...');

  // 2️⃣ 그룹 데이터 삽입
  await prisma.group.createMany({
    data: GROUP,
    skipDuplicates: true,
  });

  console.log('✅ Groups inserted successfully!');

  // 3️⃣ 멤버 데이터 삽입 (이미 groupId가 올바르므로 그대로 사용)
  await prisma.members.createMany({
    data: MEMBER,
    skipDuplicates: true,
  });

  console.log('✅ Members inserted successfully!');

  // 4️⃣ 기록 데이터 삽입 (이미 memberId, groupId가 올바르므로 그대로 사용)
  await prisma.record.createMany({
    data: RECORD,
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
