import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class PostSignUpRequest {
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

  @ApiProperty({
    example: 'teddy1234',
    description: '확인 비밀번호',
    required: true,
  })
  @IsString()
  confirmPassword: string;

  @ApiProperty({
    example: '010-1111-1111',
    description: '핸드폰 번호',
    required: true,
  })
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    example: '테디',
    description: '닉네임',
    required: true,
  })
  @IsString()
  nickname: string;
}
