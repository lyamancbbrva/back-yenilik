import { Router } from "express";
import { AdminController } from "../../../Core/Api/admin/admin.controller";

export const adminRouter = Router()

const controller = AdminController()

adminRouter.post('/create-user', controller.createUser)
adminRouter.get('/users', controller.getUsers)
adminRouter.get('/orders', controller.getOrders)
adminRouter.delete('/user/:id', controller.deleteUser)