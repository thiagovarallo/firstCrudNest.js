import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./entity/usuario.Entity";

@Injectable()
export class UsuarioRepository {
    private dataUsuario: UsuarioEntity[]  = [];

    async salvar(usuario) {
        this.dataUsuario.push(usuario);
    }

    async UsuarioAll() {
        return this.dataUsuario;
    }

    async existeEmail(email: string) {
        const possivelUser = this.dataUsuario.find(
            dataUsuario => dataUsuario.email === email
        );

        return possivelUser !== undefined;
    }

    async atualizaUser (id: string, data: Partial<UsuarioEntity>) {
        const searchUser = this.dataUsuario.find( dataUsuario => dataUsuario.id === id );

        if (!searchUser) {
            throw new Error("Usuário não encontrado");
        }

        Object.entries(data).forEach( ([key, value]) => {
            if (key === 'id') {
                return;
            }

            searchUser[key] = value;
        } );

        return searchUser;
    }

    async remove(id: string) {
        const searchUser = this.dataUsuario.find( dataUsuario => dataUsuario.id === id );

        this.dataUsuario = this.dataUsuario.filter(dataUsuario => dataUsuario.id !== id);

        return this.dataUsuario;
    }
}