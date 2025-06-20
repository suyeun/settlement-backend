import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: any;
            username: any;
            name: any;
        };
    }>;
    getProfile(req: any): any;
    register(registerDto: RegisterDto): Promise<import("./entities/user.entity").User>;
}
