import { validate } from "class-validator"
import { NextFunction, Request, Response } from "express"
import { LoginDto, RegisterDto } from "./auth.dto"
import { errorMessages, successMessages } from "../../App/messages"
import { UserEntity } from "../../../DAL/entities/User.entity"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AppConfig } from "../../../consts"

const register = async (req:Request, res:Response, next:NextFunction) => {
    const {full_name, email, phone_number, password, confirm_password} = req.body

    const data = new RegisterDto()
    data.full_name = full_name
    data.email = email
    data.phone_number = phone_number
    data.password = password
    data.confirm_password = confirm_password

    const validData = await validate(data)
    if (validData.length > 0) {
        return next( res.status(422).json({
            message: errorMessages[422],
            errors: validData.map((error) => ({
                field: error.property,
                message: Object.values(error.constraints || {})[0],
            })),
        }))
    }
    try {
        const existUser = await UserEntity.findOne({ where:[{ email: email },{ phone_number: phone_number }]})
        if (existUser) {
            return next( res.status(409).json({
                message: errorMessages[409],
                error: "User already exists",
            }))
        }
        const hasedPassword = bcrypt.hashSync(password, 10)
        const newUser = await UserEntity.create({
            full_name,
            email,
            phone_number,
            password: hasedPassword,
        }).save()
        res.status(201).json({
            message: successMessages[201],
            data: {
                full_name: newUser.full_name,
                email: newUser.email,
                phone_number: newUser.phone_number,
            }
        })

    } catch (error) {
        return next( res.status(500).json({
            errors: error,
            message: errorMessages[500],
        }))
    }

}
const login = async (req:Request, res:Response, next:NextFunction) => {
    const {email, password} = req.body
    const jwt_secret = AppConfig.JWT_SECRET
    const data = new LoginDto()
    data.email = email
    data.password = password
    const validData = await validate(data)

    if (validData.length > 0) {
        return next( res.status(422).json({
            message: errorMessages[422],
            errors: validData.map((error) => ({
                field: error.property,
                message: Object.values(error.constraints || {})[0],
            })),
        }))
    }

    try {
        const existUser = await UserEntity.findOne({ where: { email } })
        if (!existUser) {
            return next( res.status(401).json({
                message: errorMessages[401],
                error: "Email or password is incorrect",
            }))
        }
        const isPasswordValid = bcrypt.compareSync(password, existUser.password)
        if (!isPasswordValid) {
            return next( res.status(401).json({
                message: errorMessages[401],
                error: "Email or password is incorrect",
            }))
        }
        const payload = {
            id: existUser.id,
        }
        if (!jwt_secret) {
            return next( res.status(500).json({
                message: errorMessages[500],
                errors: "JWT secret is not defined",
            }))
            
        }
        const token = jwt.sign(payload, jwt_secret)
        res.status(200).json({
            message: successMessages[200],
            token
        })
        
    } catch (error) {
        return next( res.status(500).json({
            message: errorMessages[500],
            errors: error,
        }))
    }
}

export const AuthController = () => ({
    register, login
})