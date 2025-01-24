import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsArray, IsString } from 'class-validator';
import { BaseResponse } from 'config/base.response';

export class PostSignUpResultData {
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

export abstract class PostSignUpResponse extends BaseResponse {
  @ApiProperty({
    description: 'result 객체',
    required: true,
  })
  @IsArray()
  result: PostSignUpResultData;
}
