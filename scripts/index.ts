const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  const rel_user = await prisma.employee.findFirst({
    where: { name: { contains: "Employee 6" }},
  });
  console.log(rel_user);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
