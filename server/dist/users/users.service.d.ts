import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findByEmail(email: string): Promise<User | undefined>;
    findById(id: number): Promise<User | undefined>;
    create(userData: Partial<User>): Promise<User>;
}
