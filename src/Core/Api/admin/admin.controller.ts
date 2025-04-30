import { NextFunction, Request, Response } from "express"

const createUser = async (req:Request, res:Response, next:NextFunction) => {}
const getUsers = async (req:Request, res:Response, next:NextFunction) => {}
const getOrders = async (req:Request, res:Response, next:NextFunction) => {}
const deleteUser = async (req:Request, res:Response, next:NextFunction) => {}

export const AdminController = () => ({
    createUser,
    getUsers,
    getOrders,
    deleteUser
})