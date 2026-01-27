import { createConnection } from 'typeorm';
import { User } from './users/entities/user.entity';

async function checkUsers() {
    try {
        const connection = await createConnection({
            type: 'sqlite',
            database: 'data/house.db',
            entities: [User],
        });
        const userRepository = connection.getRepository(User);
        const users = await userRepository.find();
        console.log('Users in database:', users.map(u => ({ id: u.id, email: u.email, role: u.role })));
        await connection.close();
    } catch (err) {
        console.error('Error checking users:', err);
    }
}
checkUsers();
