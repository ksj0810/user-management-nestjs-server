import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class GetUsersDetailRequest {
  @ApiProperty({
    example: 1,
    description: '유저 아이디',
    required: true,
  })
  @IsNumber()
  userId: number;
}
