import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsString } from 'class-validator';
import { BaseResponse } from 'config/base.response';

// result 객체 정보
export class GetUsersDetailResultData {
  @ApiProperty({
    example: 1,
    description: '유저 아이디',
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

  @ApiProperty({
    example: '2024-11-25 15:43:53',
    description: '생성 날짜',
    required: true,
  })
  @IsString()
  createdAt: string;

  @ApiProperty({
    example: 'ACTIVE',
    description: '회원 상태',
    required: true,
  })
  @IsString()
  status: string;
}

// response 객체
export abstract class GetUsersDetailResponse extends BaseResponse {
  @ApiProperty({
    description: 'result 객체',
    required: true,
  })
  @IsObject()
  result: GetUsersDetailResultData;
}
