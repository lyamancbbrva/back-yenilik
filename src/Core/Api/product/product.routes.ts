import { Router } from "express";
import { ProductController } from "./product.controller";
import { useAuth } from "../../App/middlewares/auth.middleware";
import { upload } from "../../App/middlewares/multer.middleware";

export const productRouter = Router()
const controller = ProductController()

productRouter.post('/create', useAuth, upload.single('img'), controller.create)
productRouter.put('/update/:id', controller.update)
productRouter.delete('/delete/:id', controller.deletee)
productRouter.get('/all', controller.get)
productRouter.get('/:id', controller.getById)
