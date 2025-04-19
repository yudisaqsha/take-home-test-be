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
exports.addInventory = addInventory;
exports.getAllInventory = getAllInventory;
exports.getAllCategory = getAllCategory;
exports.getInventoryById = getInventoryById;
exports.updateInventory = updateInventory;
exports.deleteInventory = deleteInventory;
const inventory_repository_1 = require("../repositories/inventory.repository");
function addInventory(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, stock, buy_price, sell_price, categoryId } = data;
        if (!name || stock == null || !buy_price || !sell_price) {
            throw { status: 400, message: "All fields required" };
        }
        if (stock < 0) {
            throw { status: 400, message: "Stock can't go negative" };
        }
        if (sell_price <= buy_price) {
            throw { status: 400, message: "Sell price can't go lower" };
        }
        return yield (0, inventory_repository_1.createInventory)({
            name,
            stock,
            buy_price,
            sell_price,
            categoryId,
        });
    });
}
function getAllInventory() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, inventory_repository_1.findAllInventory)();
    });
}
function getAllCategory() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, inventory_repository_1.findAllCategories)();
    });
}
function getInventoryById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, inventory_repository_1.findInventoryById)(id);
    });
}
function updateInventory(id, updates) {
    return __awaiter(this, void 0, void 0, function* () {
        const existing = yield (0, inventory_repository_1.findInventoryById)(id);
        if (!existing) {
            throw { status: 404, message: "Inventory item not found" };
        }
        const updateFields = {};
        if (updates.name !== undefined)
            updateFields.name = updates.name;
        if (updates.stock !== undefined) {
            if (updates.stock < 0) {
                throw { status: 400, message: "Stock can't go negative" };
            }
            updateFields.stock = updates.stock;
        }
        const newBuyPrice = updates.buy_price !== undefined ? updates.buy_price : existing.buy_price;
        const newSellPrice = updates.sell_price !== undefined ? updates.sell_price : existing.sell_price;
        if (updates.buy_price !== undefined || updates.sell_price !== undefined) {
            if (newSellPrice <= newBuyPrice) {
                throw {
                    status: 400,
                    message: "Sell price can't be lower than buy price",
                };
            }
            if (updates.buy_price !== undefined)
                updateFields.buy_price = updates.buy_price;
            if (updates.sell_price !== undefined)
                updateFields.sell_price = updates.sell_price;
        }
        if (updates.categoryId !== undefined)
            updateFields.categoryId = updates.categoryId;
        return yield (0, inventory_repository_1.updateInventory)(id, updateFields);
    });
}
function deleteInventory(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const item = yield (0, inventory_repository_1.findInventoryById)(id);
        if (!item) {
            throw { status: 404, message: "Inventory item not found" };
        }
        if (item.stock > 0) {
            throw {
                status: 400,
                message: "Cannot delete item with stock greater than 0",
            };
        }
        return yield (0, inventory_repository_1.deleteInventory)(id);
    });
}
