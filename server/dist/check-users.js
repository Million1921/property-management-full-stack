"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./users/entities/user.entity");
async function checkUsers() {
    try {
        const connection = await (0, typeorm_1.createConnection)({
            type: 'sqlite',
            database: 'data/house.db',
            entities: [user_entity_1.User],
        });
        const userRepository = connection.getRepository(user_entity_1.User);
        const users = await userRepository.find();
        console.log('Users in database:', users.map(u => ({ id: u.id, email: u.email, role: u.role })));
        await connection.close();
    }
    catch (err) {
        console.error('Error checking users:', err);
    }
}
checkUsers();
//# sourceMappingURL=check-users.js.map