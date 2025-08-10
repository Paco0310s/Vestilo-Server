import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { IS_PUBLIC_KEY, ROLES_KEY } from "../decorators";
import { envs } from "src/common/config/envs";
import { UserRole } from "../enums/user.roles.enum";
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No se proporcionó un token');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: envs.jwt.secret,
      });

      request.user = {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        roles: payload.roles,
        iat: payload.iat,
        exp: payload.exp,
      };

      console.log('request.user:', request.user);

      const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (!requiredRoles) {
        return true;
      }

      console.log('requiredRoles:', requiredRoles);

      // Check if the user has the required roles
      const hasRole = () => {
        return requiredRoles.some((role) => request.user.role === role);
      };

      console.log('hasRole:', hasRole());

      if (!hasRole()) {
        throw new UnauthorizedException('No tienes permiso para acceder a este recurso');
      }

    } catch {
      throw new UnauthorizedException('No autorizado');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
