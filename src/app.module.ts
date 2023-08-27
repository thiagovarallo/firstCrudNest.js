import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuarios/usuario.module';


@Module({
  imports: [UsuarioModule],

})
export class AppModule {}
