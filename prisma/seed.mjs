import { PrismaClient } from '@prisma/client';
import { parties, statements, partyPositions } from '../data/questionnaire.cjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.partyPosition.deleteMany();
  await prisma.userResponse.deleteMany();
  await prisma.statement.deleteMany();
  await prisma.party.deleteMany();

  await prisma.party.createMany({ data: parties });
  await prisma.statement.createMany({ data: statements });
  await prisma.partyPosition.createMany({ data: partyPositions });
}

main()
  .catch(error => {
    console.error('Seeding failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
