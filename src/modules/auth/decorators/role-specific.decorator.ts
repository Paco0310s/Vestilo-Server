import { UserRole } from '../enums/user.roles.enum';
import { Roles } from './roles.decorator';

// Decorador para requerir rol de administrador
export const AdminOnly = () => Roles(UserRole.admin);

// Decorador para requerir rol de vendedor
export const SellerOnly = () => Roles(UserRole.seller);

// Decorador para requerir rol de cliente
export const ClientOnly = () => Roles(UserRole.client);

// Decorador para requerir rol de administrador o vendedor
export const AdminOrSeller = () => Roles(UserRole.admin, UserRole.seller);
