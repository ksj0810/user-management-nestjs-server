import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PostSignInRequest {
  @ApiProperty({
    example: 'abc123@gmail.com',
    description: '이메일',
    required: true,
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: 'teddy1234',
    description: '비밀번호',
    required: true,
  })
  @IsString()
  password: string;
}
