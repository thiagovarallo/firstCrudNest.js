import { IsEmail, IsString, MinLength } from "class-validator";
import { EmailEhUnico } from "src/validation/email-eh-unico.validation";

export class criaUsuarioDTO {

    
    id: string
    @IsString()
    name: string;
    @IsEmail()
    @EmailEhUnico({ message: "Já existe um úsuario com esse email" })
    email: string;
    @MinLength(6)
    senha: string;
}