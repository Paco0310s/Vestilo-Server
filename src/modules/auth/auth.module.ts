import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { envs } from 'src/common/config/envs';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: envs.jwt.secret,
      signOptions: { expiresIn: envs.jwt.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
