import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const usersService = app.get(UsersService);

    const adminEmail = 'mmillion728@gmail.com';
    const adminPassword = 'Ti@!$%';

    const existingAdmin = await usersService.findByEmail(adminEmail);
    if (!existingAdmin) {
        await usersService.create({
            email: adminEmail,
            password: adminPassword,
            name: 'System Admin',
            role: 'admin',
        });
        console.log('Admin user created successfully');
    } else {
        console.log('Admin user already exists');
    }

    await app.close();
}
bootstrap();
