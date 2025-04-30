import {Entity,	Column, OneToMany,} from "typeorm";
import { CommonEntity } from "./Common.entity";
import { SubcategoryEntity } from "./Subcategory.entity";
import { ProductEntity } from "./Product.entity";

@Entity("categories")
export class CategoryEntity extends CommonEntity {
	@Column({ type: "varchar", length: 255 })
	name!: string;

    @OneToMany(()=> SubcategoryEntity, (subcategory) => subcategory.category)
    subcategories!: SubcategoryEntity[];

    @OneToMany(() => ProductEntity, (product) => product.category)
    products!: ProductEntity[];
}
