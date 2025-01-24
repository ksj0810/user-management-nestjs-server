import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class GetUsersRequest {
  @ApiProperty({
    example: 1,
    description: '페이지 번호',
    required: true,
  })
  @IsNumber()
  page: number;

  @ApiProperty({
    example: 10,
    description: '페이징 크기',
    required: true,
  })
  @IsNumber()
  size: number;

  @ApiProperty({
    example: 'desc',
    description: '정렬 타입 (desc or asc)',
    required: true,
  })
  @IsNumber()
  sortType: string;

  @ApiProperty({
    example: '테디',
    description: '검색할 닉네임',
    required: false,
  })
  @IsString()
  nickname: string;
}
