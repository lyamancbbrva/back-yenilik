import { IsNotEmpty, IsNumber, IsString, IsOptional, IsArray } from 'class-validator';

export class CreateOrderDto {
    @IsNotEmpty({ message: 'Total amount sahəsi boş ola bilməz' })
    @IsNumber()
    totalAmount!: number;

    @IsNotEmpty({ message: 'Address sahəsi boş ola bilməz' })
    address!: string;

    @IsNotEmpty({   message: 'Payment method sahəsi boş ola bilməz' })
    payment_method!: string;

    @IsNotEmpty({ message: 'Status sahəsi boş ola bilməz' })
    status!: string;

    @IsNumber()
    user_id!: number;

    @IsArray()
    products!: number[];
    
}
