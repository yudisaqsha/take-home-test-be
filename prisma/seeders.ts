// prisma/seed.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const categories = [
    { name: "Electronics" },
    { name: "Office Supplies" },
    { name: "Furniture" },
    { name: "Kitchen Equipment" },
    { name: "Cleaning Supplies" },
    { name: "Tools" },
    { name: "Clothing" },
    { name: "Books" },
  ];

  for (const category of categories) {
    const createdCategory = await prisma.category.upsert({
      where: { name: category.name }, // Ensure name is unique
      update: {},                     // Nothing to update
      create: category,              // Create if it doesn't exist
    });

    console.log(
      `Ensured category: ${createdCategory.name} with id: ${createdCategory.id}`
    );
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
