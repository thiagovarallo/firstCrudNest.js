import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";
import EmailEhUnico from "src/validation/email-eh-unico.validation";

@Module({
    controllers: [UsuarioController],
    providers: [UsuarioRepository, EmailEhUnico]
    
})
export class UsuarioModule {}