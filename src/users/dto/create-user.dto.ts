import { IsEmail, IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  passwordHash: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  phoneNumber?: string;
}
