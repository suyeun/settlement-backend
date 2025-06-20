export declare class User {
    id: number;
    username: string;
    password: string;
    name: string;
    isActive: boolean;
    role: 'admin' | 'user';
    createdAt: Date;
    updatedAt: Date;
}
