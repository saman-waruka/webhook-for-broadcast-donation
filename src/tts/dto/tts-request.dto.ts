import { IsNotEmpty, IsString } from 'class-validator';

export class TtsRequestDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}
