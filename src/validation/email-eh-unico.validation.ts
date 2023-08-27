import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { UsuarioRepository } from "src/usuarios/usuario.repository";

@Injectable()
@ValidatorConstraint({ async: true })
export default class EmailEhUnicoValidator implements ValidatorConstraintInterface {

    constructor(private repository: UsuarioRepository) {}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> { 
        const emailExiste = await this.repository.existeEmail(value);

        return !emailExiste;
    }

}

export const EmailEhUnico = (opcoesDeValidacao: ValidationOptions) => {
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesDeValidacao,
            constraints: [],
            validator: EmailEhUnicoValidator
        });
    };
}