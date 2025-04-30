import { NextFunction, Request, Response } from "express";
import { errorMessages } from "../../App/messages";
import { CategoryEntity } from "../../../DAL/entities/Category.entity";
import { validate } from "class-validator";
import { SubcategoryEntity } from "../../../DAL/entities/Subcategory.entity";

const create = async (req: Request, res: Response, next: NextFunction) => {
	const { name } = req.body;

	const data = new CategoryEntity();
	data.name = name;

	const validData = await validate(data);
	if (validData.length > 0) {
		return next(res.status(422).json({
			message: "Validation Error",
			errors: validData.map((error) => ({
				field: error.property,
				message: Object.values(error.constraints || {})[0],
			})),
		}))
	}
	try {
		const existCategory = await CategoryEntity.findOne({ where: { name } });
		if (existCategory)
			return next(
				res.status(400).json({ message: "Category already exists" })
			);
		const newCategory = await CategoryEntity.create({ name }).save();
		return next(res
			.status(201)
			.json({
				message: "Category created successfully",
			}))
	} catch (error) {
		return next(res.status(500).json({ message: errorMessages[500], error }))
	}
};
const update = async (req: Request, res: Response, next: NextFunction) => {
	
	const { name } = req.body;
	const {id} = req.params;
	const data = new CategoryEntity();
	data.name = name;
	const validData = await validate(data);

	if (validData.length > 0) {
		return next(res.status(422).json({
			message: "Validation Error",
			errors: validData.map((error) => ({
				field: error.property,
				message: Object.values(error.constraints || {})[0],
			})),
		}))
	}
	try {
		const existCategory = await CategoryEntity.findOne({ where: { id } });
		if (!existCategory)
			return next(
				res.status(400).json({ message: "Category not found" })
			);
		await CategoryEntity.update(id, { name });
		return next(res
			.status(200)
			.json({
				message: "Category updated successfully",
			}))
		
	} catch (error) {
		return next(res.status(500).json({ message: errorMessages[500], error }))
		
	}
};
const deletee = async (req: Request, res: Response, next: NextFunction) => {
	const {id} = req.params;
	try {
		const existCategory = await CategoryEntity.findOne({ where: { id } });
		if (!existCategory)
			return next(
				res.status(400).json({ message: "Category not found" })
			);		
		await CategoryEntity.delete(id);
		return next(res
			.status(200)
			.json({
				message: "Category deleted successfully",
			}))
		
	} catch (error) {
		console.log(error)
		return next(res.status(500).json({ message: errorMessages[500], error }))
	}
};
const get = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const categories = await CategoryEntity.createQueryBuilder('category')
		.leftJoinAndSelect("category.subcategories", "subcategory")
		.select([
			'category.id',
			'category.name',
			'subcategory.id',
			'subcategory.name'
		]).getMany()
		if (!categories)
			return next(
				res.status(400).json({ message: "Categories not found" })
			);
		return next(res
			.status(200)
			.json({
				message: "Categories found successfully",
				data: categories
			}))
		
	} catch (error) {
		return next(res.status(500).json({ message: errorMessages[500], error }))
	}

};
const getById = async (req: Request, res: Response, next: NextFunction) => {
	const {id} = req.params;
	try {
		const existCategory = await CategoryEntity.findOne({ where: { id }, select:['id', 'name'] });
		if (!existCategory)
			return next(
				res.status(400).json({ message: "Category not found" })
			);
		return next(res
			.status(200)
			.json({
				message: "Category found successfully",
				data: existCategory
			}))
		
	} catch (error) {
		return next(res.status(500).json({ message: errorMessages[500], error }))
	}
};

export const CategoryController = () => ({
	create,
	update,
	deletee,
	get,
	getById,
});
