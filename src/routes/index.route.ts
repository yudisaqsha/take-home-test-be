import express from "express";
import { invRoutes } from "./inventory.route";
export const router = express.Router()

router.use('/inventory',invRoutes)