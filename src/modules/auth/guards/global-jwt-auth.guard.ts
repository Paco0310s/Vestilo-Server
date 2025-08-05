import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class GlobalJwtAuthGuard extends JwtAuthGuard implements CanActivate {
  private rolesGuard: RolesGuard;

  constructor(private reflector: Reflector) {
    super();
    this.rolesGuard = new RolesGuard(reflector);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (isPublic) {
      return true;
    }

    // Primero verificar autenticación JWT
    const isAuthenticated = await super.canActivate(context) as boolean;
    
    if (!isAuthenticated) {
      return false;
    }

    // Luego verificar roles
    return this.rolesGuard.canActivate(context);
  }
}
