import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
    try {
        console.log('Bootstrap starting...');
        const app = await NestFactory.create(AppModule);

        // Enable global validation pipe
        app.useGlobalPipes(new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: false,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }));

        app.setGlobalPrefix('api');
        app.enableCors();
        await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
        console.log(`Application is running on: ${await app.getUrl()}`);
    } catch (err) {
        console.error('Fatal error during bootstrap:', err);
        process.exit(1);
    }
}
bootstrap();
