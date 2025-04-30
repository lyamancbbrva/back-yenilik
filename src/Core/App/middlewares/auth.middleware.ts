import { NextFunction, Response } from "express";
import { AuthRequest } from "../../../types";
import { errorMessages } from "../messages";
import { AppConfig } from "../../../consts";
import jwt from 'jsonwebtoken'
import { JwtPayload } from "jsonwebtoken";
import { UserEntity } from "../../../DAL/entities/User.entity";

export const useAuth = async (req:AuthRequest, res:Response, next:NextFunction):Promise <void> => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return next( res.status(401).json({ message: errorMessages[401] }))
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return next(res.status(401).json({ message: errorMessages[401] }))
    }
    try {
        const jwt_secret = AppConfig.JWT_SECRET
        if (!jwt_secret) {
            return next(res.status(401).json({ message: "JWT secret is not defined" }));
        }
        const decoded = jwt.verify(token, jwt_secret) as JwtPayload
        if (!decoded) {
            return next(res.status(401).json({ message: errorMessages[401] }))
        }
        const user = await UserEntity.findOne({ where: { id: decoded.id } })
        if (!user) {
            return next(res.status(401).json({ message: errorMessages[401] }))
        }
        req.user = user
        next()

    } catch (error) {
        return  next(res.status(401).json({ message: errorMessages[401] }))
    }
    
}