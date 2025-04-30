import { Router } from "express";
import { AuthController } from "./auth.controller";
import { useAuth } from "../../App/middlewares/auth.middleware";

export const authRouter = Router()
const controller = AuthController()

authRouter.post('/login', controller.login)
authRouter.post('/register', controller.register)