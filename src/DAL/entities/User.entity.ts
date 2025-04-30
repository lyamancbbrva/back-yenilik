import { Column, Entity, OneToMany } from "typeorm";
import { CommonEntity } from "./Common.entity";
import { EuserRole } from "../../Core/App/enums/enums";
import { OrderEntity } from "./Order.entity";

@Entity('users')
export class UserEntity extends CommonEntity {
    @Column({ type: 'varchar', length: 50, nullable: false })
    full_name!: string;

    @Column({ type: 'varchar', length: 150, nullable: false , unique: true})
    email!: string;

    @Column({ type: 'varchar', length: 150, nullable: false })
    password!: string;

    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    phone_number!: string;

    @Column({ type: 'enum', enum: EuserRole, default: EuserRole.MÜŞTƏRİ })
    user_role!: EuserRole;

    @OneToMany(() => OrderEntity, (order) => order.user)
    orders!: OrderEntity[];
}
