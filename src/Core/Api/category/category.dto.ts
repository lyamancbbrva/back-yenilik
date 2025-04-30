import { IsArray, IsNotEmpty, MinLength } from 'class-validator';

export class CategoryDto {
    @IsNotEmpty({ message: 'Ad sahəsi boş ola bilməz' })
    @MinLength(3, { message: 'Kateqoriya adı minimum 3 simvol olmalıdır' })
    name!: string;

    @IsArray()
    subcategories!: number[];
}