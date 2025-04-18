import {
    createInventory,
    findAllInventory,
    findInventoryById,
    findAllCategories,
    updateInventory as repoUpdateInventory,
    deleteInventory as repoDeleteInventory,
  } from "../repositories/inventory.repository";
  
  export async function addInventory(data: any) {
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
  
    return await createInventory({
      name,
      stock,
      buy_price,
      sell_price,
      categoryId,
    });
  }
  
  export async function getAllInventory() {
    return await findAllInventory();
  }
  export async function getAllCategory(){
    return await findAllCategories()
  }

  export async function getInventoryById(id:string){
    return await findInventoryById(id)
  }
  
  export async function updateInventory(id: string, updates: any) {
    const existing = await findInventoryById(id);
    if (!existing) {
      throw { status: 404, message: "Inventory item not found" };
    }
  
    const updateFields: any = {};
  
    if (updates.name !== undefined) updateFields.name = updates.name;
  
    if (updates.stock !== undefined) {
      if (updates.stock < 0) {
        throw { status: 400, message: "Stock can't go negative" };
      }
      updateFields.stock = updates.stock;
    }
  
    const newBuyPrice =
      updates.buy_price !== undefined ? updates.buy_price : existing.buy_price;
    const newSellPrice =
      updates.sell_price !== undefined ? updates.sell_price : existing.sell_price;
  
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
  
    return await repoUpdateInventory(id, updateFields);
  }
  
  export async function deleteInventory(id: string) {
    const item = await findInventoryById(id);
    if (!item) {
      throw { status: 404, message: "Inventory item not found" };
    }
  
    if (item.stock > 0) {
      throw {
        status: 400,
        message: "Cannot delete item with stock greater than 0",
      };
    }
  
    return await repoDeleteInventory(id);
  }
  