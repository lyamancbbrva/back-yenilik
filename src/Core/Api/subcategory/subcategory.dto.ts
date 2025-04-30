import { IsArray, IsNotEmpty, MinLength } from 'class-validator';

export class SubcategoryDto {
    @IsNotEmpty({ message: 'Ad sahəsi boş ola bilməz' })
    @MinLength(3, { message: 'Subkateqoriya adı minimum 3 simvol olmalıdır' })
    name!: string;

    @IsNotEmpty({ message: 'Kateqoriya ID sahəsi boş ola bilməz' })
    category_id!: string;

}