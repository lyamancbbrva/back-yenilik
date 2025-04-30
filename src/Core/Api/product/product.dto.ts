import { IsNotEmpty, Min, MaxLength, IsUrl, IsNumber } from 'class-validator';

export class ProductDto {
    @IsNotEmpty({ message: 'Ad sahəsi boş ola bilməz' }) 
    @MaxLength(100, { message: 'Ad maksimum 100 simvol ola bilər' })
    name!: string;
 
    @MaxLength(500, { message: 'Təsvir maksimum 500 simvol ola bilər' })
    description!: string;

    @IsNotEmpty({ message: 'Qiymət sahəsi boş ola bilməz' }) 
    price!: number;

    @IsNotEmpty({ message: 'Stok sahəsi boş ola bilməz' }) 
    stock!: number;

    @IsNotEmpty({message: "Subkategoriya ID sahəsi boş ola bilməz"})
    subcategory_id!: number;

    discounted_price!: number;
    discounted_percentage!: number;
    is_top_seller!: boolean;

}