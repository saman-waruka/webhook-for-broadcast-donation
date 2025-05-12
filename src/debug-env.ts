// debug-env.ts
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // ✅ ถ้าอยู่ที่ root
    }),
  ],
})
class DebugEnvModule {}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(DebugEnvModule);
  const configService = app.get(ConfigService);

  console.log('🟢 process.cwd():', process.cwd());
  console.log('🟢 process.env.WEBSOCKET_SECRET:', process.env.WEBSOCKET_SECRET);

  console.log(
    '🟢 ConfigService.get("WEBSOCKET_SECRET"):',
    configService.get('WEBSOCKET_SECRET'),
  );

  await app.close();
}

bootstrap();
