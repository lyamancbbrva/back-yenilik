import { Entity, Column, ManyToOne, JoinTable, JoinColumn } from "typeorm";
import { CommonEntity } from "./Common.entity";
import { CategoryEntity } from "./Category.entity";

@Entity("subcategories")
export class SubcategoryEntity extends CommonEntity {
    @Column({ type: "varchar" })
    name!: string;

    @ManyToOne(() => CategoryEntity, (category) => category.subcategories)
    @JoinColumn({name: "category_id"})
    category!: CategoryEntity;
}
