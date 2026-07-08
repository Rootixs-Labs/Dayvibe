import { prisma } from './lib/client.js';

async function main() {

  const user = await prisma.user.create({
    data: {
      name: "Aldo",
      email: "aldaasdao1244sa3@gmail.com",
    },
  });

  console.log("Created user: ", user);
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