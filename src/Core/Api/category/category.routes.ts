import { Router } from "express";
import { CategoryController } from "./category.controller";
import { useAuth } from "../../App/middlewares/auth.middleware";

export const categoryRouter = Router()
const controller = CategoryController()

categoryRouter.post('/create', useAuth, controller.create)
categoryRouter.put('/update/:id', useAuth, controller.update)
categoryRouter.delete('/delete/:id', useAuth, controller.deletee)
categoryRouter.get('/all', controller.get)
categoryRouter.get('/:id', controller.getById)

