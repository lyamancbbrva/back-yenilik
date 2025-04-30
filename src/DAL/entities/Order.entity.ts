import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';
import { EorderStatus, EpaymentMethod } from '../../Core/App/enums/enums';
import { CommonEntity } from './Common.entity';
import { ProductEntity } from './Product.entity';
import { UserEntity } from './User.entity';


@Entity('orders')
export class OrderEntity extends CommonEntity {

    @Column({ type: 'int' })
    totalAmount!: number;

    @Column({ type: 'varchar', nullable: false })
    address!: string;

    @Column({ type: 'enum', enum: EpaymentMethod, default: EpaymentMethod.CASH })
    payment_method!: string;

    @Column({ type: 'enum', enum: EorderStatus, default: EorderStatus.PENDING })
    status!: EorderStatus;

    @Column({ type: 'int' })
    user_id!: number;

    @ManyToOne(() => UserEntity, (user) => user.orders)
    user!: UserEntity;

    @ManyToMany(() => ProductEntity, (product) => product.orders)
    products!: ProductEntity[];

}