"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
async function bootstrap() {
    try {
        console.log('Bootstrap starting...');
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.useGlobalPipes(new common_1.ValidationPipe({
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
    }
    catch (err) {
        console.error('Fatal error during bootstrap:', err);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map