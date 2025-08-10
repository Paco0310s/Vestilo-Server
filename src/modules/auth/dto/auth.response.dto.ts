import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
    @ApiProperty({ description: 'ID único del usuario', example: 1 })
    id: number;

    @ApiProperty({ description: 'Email del usuario', example: 'juan@vestilo.com', required: false })
    email?: string;

    @ApiProperty({ description: 'Nombre completo del usuario', example: 'Juan Pérez' })
    name: string;

    @ApiProperty({ description: 'Teléfono del usuario', example: '+1234567890' })
    phone: string;

    @ApiProperty({ description: 'Roles asignados al usuario', example: ['admin', 'seller'], type: [String] })
    roles: string[];

    @ApiProperty({ description: 'Token JWT para autenticación', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
    token: string;
}
