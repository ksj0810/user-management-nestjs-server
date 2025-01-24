import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PostSearchEmailRequest {
  @ApiProperty({
    example: '010-1111-1111',
    description: '핸드폰 번호',
    required: true,
  })
  @IsString()
  phoneNumber: string;
}
