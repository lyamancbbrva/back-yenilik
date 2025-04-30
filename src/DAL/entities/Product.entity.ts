import { Column, Entity, ManyToMany, ManyToOne } from "typeorm";
import { CommonEntity } from "./Common.entity";
import { OrderEntity } from "./Order.entity";
import { CategoryEntity } from "./Category.entity";

@Entity("products")
export class ProductEntity extends CommonEntity {
	@Column({ type: "varchar", length: 50, nullable: false })
	name!: string;

	@Column({ type: "text", nullable: false })
	description!: string;

	@Column({ type: "int", nullable: false })
	price!: number;

	@Column({ type: "varchar", length: 50, nullable: false })
	image_url!: string;

	@Column({ type: "int", nullable: false })
	subcategory_id!: number;

	@Column({ type: "int", nullable: false })
	stock!: number;

	@Column()
	img_url? : string;

	@Column({ type: "int" })
	discounted_price!: number;

	@Column({ type: "int" })
	discounted_percentage!: number;

	@Column({ type: "boolean", default: false })
	is_top_seller!: boolean;

	@ManyToMany(() => OrderEntity, (order) => order.products)
	orders!: OrderEntity[];

	@ManyToOne(() => CategoryEntity, (category) => category.products)
	category!: CategoryEntity;
}
