import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { EmailEhUnico } from "src/validation/email-eh-unico.validation";

export class AtualizarUsuarioDTO {

    
    id: string
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string;
    @IsEmail()
    @EmailEhUnico({ message: "Já existe um úsuario com esse email" })
    @IsOptional()
    email: string;
    @MinLength(6)
    @IsOptional()
    senha: string;
}

