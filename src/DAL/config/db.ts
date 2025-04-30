import { DataSource } from "typeorm";
import { AppConfig } from "../../consts";
import { UserEntity } from "../entities/User.entity";
import { OrderEntity } from "../entities/Order.entity";
import { ProductEntity } from "../entities/Product.entity";
import { CategoryEntity } from "../entities/Category.entity";
import { SubcategoryEntity } from "../entities/Subcategory.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: AppConfig.DB_LOCALHOST,
  port: Number(AppConfig.DB_PORT),
  username: AppConfig.DB_USERNAME,
  password: AppConfig.DB_PASSWORD,
  database: AppConfig.DB_NAME,
  entities: [UserEntity, OrderEntity, ProductEntity, CategoryEntity, SubcategoryEntity],
  subscribers: [],
  migrations: [],
  logging: false,
  synchronize: true,
});