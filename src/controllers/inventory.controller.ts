import { Request, Response } from "express";
import {
  addInventory,
  getAllInventory,
  getInventoryById,
  updateInventory,
  deleteInventory,
  getAllCategory,
} from "../services/inventory.service";

export async function addData(req: Request, res: Response) {
  try {
    const added = await addInventory(req.body);
    res.status(201).json({ message: "Data Added!", added });
  } catch (err: any) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Error adding data" });
  }
}

export async function showAllCategory(req: Request, res: Response) {
  try {
    const categories = await getAllCategory();
    res.status(200).json({ message: "Data retrieved!", categories:categories });
  } catch (err: any) {
    res.status(500).json({ message: "Error fetching data", err });
  }
}

export async function showAllData(req: Request, res: Response) {
  try {
    const inventory = await getAllInventory();
    res.status(200).json({ message: "Data retrieved!", inventory:inventory });
  } catch (err: any) {
    res.status(500).json({ message: "Error fetching data", err });
  }
}

export async function updateData(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const updated = await updateInventory(id, req.body);
    res.status(200).json({ message: "Inventory updated!", updated });
  } catch (err: any) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Error updating data" });
  }
}

export async function deleteData(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const deleted = await deleteInventory(id);
    res.status(200).json({ message: "Inventory deleted!", deleted });
  } catch (err: any) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Error deleting data" });
  }
}

export async function showDatabyId(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const dataById = await getInventoryById(id);
    if (!dataById) {
      return res.status(404).json({ message: "Data not found!" });
    }
    return res
      .status(200)
      .json({ message: "Data found!", inventory: dataById });
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: err.message || "Error retrieving data" });
  }
}
