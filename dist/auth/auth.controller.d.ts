import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: any;
        user: {
            id: any;
            username: any;
            name: any;
        };
    }>;
    getProfile(req: any): any;
    register(registerDto: RegisterDto): Promise<import("./entities/user.entity").User>;
    getMe(req: any): any;
    getUsers(req: any): Promise<import("./entities/user.entity").User[]>;
    updateUser(id: string, body: any, req: any): Promise<import("./entities/user.entity").User>;
    deleteUser(id: string, req: any): Promise<{
        message: string;
    }>;
}
