import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { BaseResponse } from 'config/base.response';

export class PostSignInResultData {
  @ApiProperty({
    example: 'JWT 토큰',
    description: 'JWT 토큰',
    required: true,
  })
  @IsString()
  jwt: string;

  @ApiProperty({
    example: 1,
    description: '사용자 아이디',
    required: true,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    example: 'abc123@gmail.com',
    description: '이메일',
    required: true,
  })
  @IsString()
  email: string;
}

export abstract class PostSignInResponse extends BaseResponse {
  @ApiProperty({
    description: 'result 객체',
    required: true,
  })
  @IsArray()
  result: PostSignInResultData;
}
