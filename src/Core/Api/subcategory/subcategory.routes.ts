import { Router } from "express";
import { SubcategoryController } from "./subcategory.controller";
import { useAuth } from "../../App/middlewares/auth.middleware";

export const subcategoryRouter = Router()
const controller = SubcategoryController()  

subcategoryRouter.post('/create', useAuth, controller.create)
subcategoryRouter.put('/update/:id', useAuth, controller.update)
subcategoryRouter.delete('/delete/:id', useAuth, controller.deletee)
subcategoryRouter.get('/all', controller.get)
subcategoryRouter.get('/get/:id', controller.getById)