"use strict";
// prisma/seed.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
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
            const createdCategory = yield prisma.category.upsert({
                where: { name: category.name }, // Ensure name is unique
                update: {}, // Nothing to update
                create: category, // Create if it doesn't exist
            });
            console.log(`Ensured category: ${createdCategory.name} with id: ${createdCategory.id}`);
        }
        console.log("Seeding completed!");
    });
}
main()
    .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
