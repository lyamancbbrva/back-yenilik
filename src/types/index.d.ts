import { Request } from "express";
import { UserEntity } from "../DAL/entities/User.entity";

export interface Iuser extends UserEntity {
    id: string;
    full_name: string;
}
export interface AuthRequest extends Request {
    user?: Iuser
}