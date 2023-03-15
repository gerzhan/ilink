import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';
import { UserDto } from './user.dto';

export class UserInfoDto {
  @ApiProperty()
  @IsString()
  @Expose()
  id: string;

  @ApiProperty()
  @IsString()
  @Expose()
  name: string;

  @ApiProperty()
  @IsArray()
  @Expose()
  friends: UserDto[];
}
