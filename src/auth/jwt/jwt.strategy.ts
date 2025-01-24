import { HttpException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { secret } from '../../../config/secret';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './jwt.payload';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RESPONSE } from 'config/response.utils';
import { UserInfo } from '../../entity/user-info.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userRepository: Repository<UserInfo>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('x-access-token'),
      secretOrKey: secret.jwt_secret_key,
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    // User 정보 추출
    const user: UserInfo = await this.userRepository.findOne({
      where: { id: payload.id, status: 'ACTIVE' },
    });
    // 유저가 존재하지 않는 경우
    if (!user) {
      throw new HttpException(RESPONSE.NON_EXIST_USER, 201);
    }
    // payload값 user로 리턴
    return payload;
  }
}
