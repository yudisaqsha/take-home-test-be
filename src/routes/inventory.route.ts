import express from "express";
import * as inventoryController from '../controllers/inventory.controller'
export const invRoutes = express.Router()

invRoutes.get('/',inventoryController.showAllData)
invRoutes.get('/category',inventoryController.showAllCategory)
invRoutes.get('/:id',inventoryController.showDatabyId)
invRoutes.post('/add',inventoryController.addData)
invRoutes.put('/:id',inventoryController.updateData)
invRoutes.delete('/:id',inventoryController.deleteData)