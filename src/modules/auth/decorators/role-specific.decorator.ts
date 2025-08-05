import { Roles } from './roles.decorator';

// Decorador para requerir rol de administrador
export const AdminOnly = () => Roles('Administrador');

// Decorador para requerir rol de vendedor
export const SellerOnly = () => Roles('Vendedor');

// Decorador para requerir rol de administrador o vendedor
export const AdminOrSeller = () => Roles('Administrador', 'Vendedor');
