import { IsString, IsNumber, Min, IsNotEmpty } from 'class-validator';

export class CreateDonationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsNumber()
  @Min(1)
  amount: number;
}
