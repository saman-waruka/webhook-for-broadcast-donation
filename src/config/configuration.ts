import { plainToInstance } from 'class-transformer';

import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  @IsNotEmpty()
  NODE_ENV: Environment;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(65535)
  PORT: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  WEBSOCKET_SECRET: string;
}
