export interface AuthService {
    login(usuario:string, clave:string): Promise<{ access_token: string }>;
    refresh(refresh_old_token:string): Promise<any>;
}