export interface AuthResponse {
    id: number;
    email?: string;
    name: string;
    phone: string;
    roles: string[];
    token: string;
}
