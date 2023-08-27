import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { criaUsuarioDTO } from "./dto/CriaUsuario.dto";
import { UsuarioEntity } from "./entity/usuario.Entity";
import { v4 as uuid } from "uuid"
import { ListaUsuarioDTO } from "./dto/ListUser.dto";
import { AtualizarUsuarioDTO } from "./dto/atualizaUsuario.dto";

@Controller('/usuario')
export class UsuarioController {

    constructor(private repositoryUsuario: UsuarioRepository ) {}

    @Post()
    async criaUsuario(@Body() data: criaUsuarioDTO) {
        const userEntity = new UsuarioEntity();
        userEntity.id = uuid();
        userEntity.name = data.name;
        userEntity.email = data.email;
        userEntity.senha = data.senha;

        this.repositoryUsuario.salvar(userEntity);
        return { 
            "usuario" : new ListaUsuarioDTO(userEntity.id, userEntity.name),
            status : "criado com sucesso"
        }
    }

    @Get()
    async test() {
        const userSave = await this.repositoryUsuario.UsuarioAll();

        const userList = userSave.map(userSave => new ListaUsuarioDTO(userSave.id, userSave.name))
    
        return userList;
    }

    @Put('/:id')
    async atualizaUser(@Param('id') id: string, @Body() data:AtualizarUsuarioDTO) {
        const userAtualizar =  await this.repositoryUsuario.atualizaUser(id, data);

        return {
            usuario: userAtualizar,
            mensagem: 'usuário atualizado com sucesso',
        }
    }


    @Delete('/:id')
    async removeUsuario(@Param('id') id: string) {
        const usuarioRemovido = await this.repositoryUsuario.remove(id);

        return {
            usuario: usuarioRemovido,
            mensagem: 'usuário removido com sucesso'
        }
    }
    

}