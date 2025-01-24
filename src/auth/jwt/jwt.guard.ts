import { HttpException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RESPONSE } from 'config/response.utils';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any) {
    // 검증 Error로 존재하지 않는 유저임을 확인
    if (err != null) {
      throw new HttpException(RESPONSE.NON_EXIST_USER, 201);
    }
    // 유저가 존재하지 않는다면 JWT 오류
    if (!user) {
      throw new HttpException(RESPONSE.CHECK_JWT_TOKEN, 201);
    }
    return user;
  }
}
