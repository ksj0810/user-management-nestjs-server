import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PatchPasswordRequest {
  @ApiProperty({
    example: 'abc123@gmail.com',
    description: '이메일',
    required: true,
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: '010-1111-1111',
    description: '핸드폰 번호',
    required: true,
  })
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    example: 'teddy1234',
    description: '비밀번호',
    required: true,
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: 'teddy1234',
    description: '확인 비밀번호',
    required: true,
  })
  @IsString()
  confirmPassword: string;
}
