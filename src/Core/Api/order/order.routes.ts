import { Router } from "express";
import { OrderController } from "./order.controller";

export const orderRouter = Router()
const controller = OrderController()

orderRouter.get('/create', controller.create)