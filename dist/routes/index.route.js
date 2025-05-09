"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const inventory_route_1 = require("./inventory.route");
exports.router = express_1.default.Router();
exports.router.use('/inventory', inventory_route_1.invRoutes);
