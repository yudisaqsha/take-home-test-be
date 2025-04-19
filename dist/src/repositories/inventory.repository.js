"use strict";
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
exports.createInventory = createInventory;
exports.findAllInventory = findAllInventory;
exports.findAllCategories = findAllCategories;
exports.findInventoryById = findInventoryById;
exports.updateInventory = updateInventory;
exports.deleteInventory = deleteInventory;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createInventory(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.inventory.create({ data });
    });
}
function findAllInventory() {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.inventory.findMany({ include: { category: true }, orderBy: { createdAt: 'asc' } });
    });
}
function findAllCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.category.findMany();
    });
}
function findInventoryById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.inventory.findUnique({ where: { id } });
    });
}
function updateInventory(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.inventory.update({ where: { id }, data });
    });
}
function deleteInventory(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.inventory.delete({ where: { id } });
    });
}
