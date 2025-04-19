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
exports.addData = addData;
exports.showAllCategory = showAllCategory;
exports.showAllData = showAllData;
exports.updateData = updateData;
exports.deleteData = deleteData;
exports.showDatabyId = showDatabyId;
const inventory_service_1 = require("../services/inventory.service");
function addData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const added = yield (0, inventory_service_1.addInventory)(req.body);
            res.status(201).json({ message: "Data Added!", added });
        }
        catch (err) {
            res
                .status(err.status || 500)
                .json({ message: err.message || "Error adding data" });
        }
    });
}
function showAllCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categories = yield (0, inventory_service_1.getAllCategory)();
            res.status(200).json({ message: "Data retrieved!", categories: categories });
        }
        catch (err) {
            res.status(500).json({ message: "Error fetching data", err });
        }
    });
}
function showAllData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const inventory = yield (0, inventory_service_1.getAllInventory)();
            res.status(200).json({ message: "Data retrieved!", inventory: inventory });
        }
        catch (err) {
            res.status(500).json({ message: "Error fetching data", err });
        }
    });
}
function updateData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const updated = yield (0, inventory_service_1.updateInventory)(id, req.body);
            res.status(200).json({ message: "Inventory updated!", updated });
        }
        catch (err) {
            res
                .status(err.status || 500)
                .json({ message: err.message || "Error updating data" });
        }
    });
}
function deleteData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const deleted = yield (0, inventory_service_1.deleteInventory)(id);
            res.status(200).json({ message: "Inventory deleted!", deleted });
        }
        catch (err) {
            res
                .status(err.status || 500)
                .json({ message: err.message || "Error deleting data" });
        }
    });
}
function showDatabyId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const dataById = yield (0, inventory_service_1.getInventoryById)(id);
            if (!dataById) {
                return res.status(404).json({ message: "Data not found!" });
            }
            return res
                .status(200)
                .json({ message: "Data found!", inventory: dataById });
        }
        catch (err) {
            return res
                .status(500)
                .json({ message: err.message || "Error retrieving data" });
        }
    });
}
