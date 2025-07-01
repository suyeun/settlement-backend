import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<any>;
    login(loginDto: LoginDto): Promise<{
        access_token: any;
        user: {
            id: any;
            username: any;
            name: any;
        };
    }>;
    createUser(username: string, password: string, name?: string): Promise<User>;
    register(registerDto: RegisterDto): Promise<User>;
    getUsers(): Promise<User[]>;
    updateUser(id: number, update: Partial<User>): Promise<User>;
    deleteUser(id: number): Promise<{
        message: string;
    }>;
}
