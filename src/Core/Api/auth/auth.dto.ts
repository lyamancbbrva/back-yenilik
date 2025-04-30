import { IsDefined, IsEmail, MinLength, Matches, IsString, ValidateIf } from "class-validator";

export class RegisterDto {
    @IsDefined({ message: "Ad boş ola bilməz!" })
    @MinLength(3, { message: "Ad ən az 3 simvol olmalıdır!" })
    full_name!: string;

    @IsDefined({ message: "Email boş ola bilməz!" })
    @IsEmail({}, { message: "Düzgün email daxil edin!" })
    email!: string;

    @IsDefined({ message: "Şifrə boş ola bilməz!" })
    @MinLength(6, { message: "Şifrə ən az 6 simvol olmalıdır!" })
    password!: string;

    @IsDefined({ message: "Şifrə təsdiqi boş ola bilməz!" })
    @ValidateIf((o) => o.password === o.confirm_password)
    confirm_password!: string;

    @IsDefined({ message: "Telefon nömrəsi boş ola bilməz!" })
    @Matches(/^\+994(50|51|55|70|77|99)[0-9]{7}$/, { message: "Telefon nömrəsi düzgün formatda deyil!" })
    phone_number!: string;
}
export class LoginDto {
    @IsDefined({ message: "Email boş ola bilməz!" })
    @IsEmail({}, { message: "Düzgün email daxil edin!" })
    email!: string;

    @IsDefined({ message: "Şifrə boş ola bilməz!" })
    @MinLength(6, { message: "Şifrə ən az 6 simvol olmalıdır!" })
    password!: string;
}
