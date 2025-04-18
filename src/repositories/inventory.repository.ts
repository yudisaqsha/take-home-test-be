import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createInventory(data: any) {
  return prisma.inventory.create({ data });
}

export async function findAllInventory() {
  return prisma.inventory.findMany({include:{category:true}, orderBy:{createdAt:'asc'}});
}
export async function findAllCategories(){
  return prisma.category.findMany()
}

export async function findInventoryById(id: string) {
  return prisma.inventory.findUnique({ where: { id } });
}

export async function updateInventory(id: string, data: any) {
  return prisma.inventory.update({ where: { id }, data });
}

export async function deleteInventory(id: string) {
  return prisma.inventory.delete({ where: { id } });
}
