import { NextFunction, Request, Response } from "express"
import { SubcategoryDto } from "./subcategory.dto"
import { validate } from "class-validator"
import { errorMessages } from "../../App/messages"
import { SubcategoryEntity } from "../../../DAL/entities/Subcategory.entity"
import { CategoryEntity } from "../../../DAL/entities/Category.entity"

const create = async (req: Request, res: Response, next: NextFunction) => {
    const {name, category_id} = req.body

    const data = new SubcategoryDto()
    data.name = name
    data.category_id = category_id

    const validData = await validate(data)

    if (validData.length > 0) {
        return next( res.status(422).json({
            message: "Validation Error",
            errors: validData.map((error) => ({
                field: error.property,
                message: Object.values(error.constraints || {})[0],
            })),
        }))
    }

    try {
        const existSubcategory = await SubcategoryEntity.findOne({ where: { name: name } })
        if (existSubcategory) {
            return next( res.status(409).json({
                message: errorMessages[409],
                error: "Subcategory already exists",
            }))
        }
        const existCategory = await CategoryEntity.findOne({ where: { id: category_id } })
        if (!existCategory) {
            return next( res.status(404).json({
                message: errorMessages[404],
                error: "Category not found",
            }))
        }
        const newSubcategory = await SubcategoryEntity.create({
            name,
            category: existCategory
        }).save()
        return next(res.status(201).json({
            message: "Subcategory created successfully",
        }))
        
    } catch (error) {
        return next( res.status(500).json({
            errors: error,
            message: errorMessages[500],
        }))
    }
}
const update = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params
    const {name} = req.body
    const data = new SubcategoryDto()
    data.name = name
    
    const validData = await validate(data)

    if (validData.length > 0) {
        return next( res.status(422).json({
            message: "Validation Error",
            errors: validData.map((error) => ({
                field: error.property,
                message: Object.values(error.constraints || {})[0],
            })),
        }))
    }

    try {
        const subcategory = await SubcategoryEntity.findOne({ where: { id: id } })
        if (!subcategory) {
            return next( res.status(404).json({
                message: errorMessages[404],
                error: "Subcategory not found",
            }))
        }
        const existSubcategory = await SubcategoryEntity.findOne({ where: { name} })
        if (existSubcategory) {
            return next( res.status(409).json({
                message: errorMessages[409],
                error: "Subcategory already exists",
            }))
        }

         await SubcategoryEntity.update({ id: id }, { name: name })
        return next(res.status(200).json({
            message: "Subcategory updated successfully",
        }))

    } catch (error) {
        return next( res.status(500).json({
            errors: error,
            message: errorMessages[500],
        }))
        
    }

}
const deletee = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params

    try {
        
        const subcategory = await SubcategoryEntity.findOne({ where: { id: id } })

        if (!subcategory) {
            return next( res.status(404).json({
                message: errorMessages[404],
                error: "Subcategory not found",
            }))
        }
        await SubcategoryEntity.delete({ id: id })
        return next(res.status(200).json({
            message: "Subcategory deleted successfully",
        }))

    } catch (error) {
        return next( res.status(500).json({
            errors: error,
            message: errorMessages[500],
        }))
        
    }
}
const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subcategories = await SubcategoryEntity.find({
            select: ["name"],
        })
        if (!subcategories) {
            return next( res.status(404).json({
                message: errorMessages[404],
                error: "Subcategories not found",
            }))
        }
        return next(res.status(200).json({
            message: "Subcategories fetched successfully",
            data: subcategories,
        }))
        
    } catch (error) {
        return next( res.status(500).json({
            errors: error,
            message: errorMessages[500],
        }))
    }
}
const getById = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params
    try {
        const subcategory = await SubcategoryEntity.findOne({ where: { id: id }, select: ["name"] })
        if (!subcategory) {
            return next( res.status(404).json({
                message: errorMessages[404],
                error: "Subcategory not found",
            }))
        }
        return next(res.status(200).json({
            message: "Subcategory fetched successfully",
            data: subcategory,
        }))
        
    } catch (error) {
        return next( res.status(500).json({
            errors: error,
            message: errorMessages[500],
        }))
        
    }
}
export const SubcategoryController = () => ({
    create, update, deletee, get, getById
})