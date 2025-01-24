import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { defaultCurrentDateTime, makeResponse } from 'common/function.utils';
import { RESPONSE } from 'config/response.utils';
import { DataSource, Not, Repository } from 'typeorm';
import { Payload } from './jwt/jwt.payload';
import { saltHashPassword, validatePassword, } from '../../config/security.utils';
import { AccountStatus, SecurityPassword, Status } from 'common/variable.utils';
import { UserInfo } from '../entity/user-info.entity';
import { UserSalt } from '../entity/user-salt.entity';
import { PostSignInRequest } from './dto/request/post-sign-in.request';
import { PostSignUpRequest } from './dto/request/post-sign-up.request';
import { errorLogger } from '../../config/logger/logger.function';
import { PatchAuthInfoRequest } from './dto/request/patch-auth-info.request';
import { PatchPasswordRequest } from './dto/request/patch-password.request';
import { PostSignInResultData } from './dto/response/post-sign-in.response';
import { PostSignUpResultData } from './dto/response/post-sign-up.response';

const location: string = __dirname + '/auth.service.ts';
let currentFunction: string;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userRepository: Repository<UserInfo>,
    @InjectRepository(UserSalt)
    private readonly userSaltRepository: Repository<UserSalt>,
    private jwtService: JwtService,
    private connection: DataSource,
  ) {}

  async signInUser(postSignInRequest: PostSignInRequest) {
    currentFunction = 'signInUser';
    try {
      // 입력한 이메일에 해당하는 유저값 추출
      const user: UserInfo = await this.userRepository.findOne({
        where: { email: postSignInRequest.email, status: 'ACTIVE' },
      });

      // 유저 정보 조회
      if (user == undefined) {
        return RESPONSE.NON_EXIST_EMAIL;
      }

      //유저 아이디에 해당하는 Salt값 추출
      const userSalt: UserSalt = await this.userSaltRepository.findOne({
        where: { userId: user.id },
      });

      // Salt값을 이용해서 현재 입력된 비밀번호와 암호화된 비밀번호 검증
      if (!validatePassword(postSignInRequest.password, userSalt.salt, user.password)) {
        return RESPONSE.NON_MATCH_PASSWORD;
      }

      //payload값 생성
      const payload: Payload = {
        id: user.id,
        email: user.email,
        phoneNumber: user.phoneNumber,
      };

      //토큰 생성
      const token: string = this.jwtService.sign(payload);

      // Response의 result 객체에 Data를 담는 부분
      const data: PostSignInResultData = {
        jwt: token,
        id: user.id,
        email: user.email,
      };

      return makeResponse(RESPONSE.SUCCESS, data);
    } catch (error) {
      errorLogger(error, location, currentFunction);
      return RESPONSE.ERROR;
    }
  }

  async createUser(postSignUpRequest: PostSignUpRequest) {
    currentFunction = 'createUser';
    try {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        // 가입한 이메일이 존재하는지 체크
        const isExistUserByEmail: number = await this.userRepository.count({
          where: { email: postSignUpRequest.email, status: Status.ACTIVE },
        });

        if (isExistUserByEmail > 0) {
          return RESPONSE.EXIST_EMAIL;
        }

        // 가입한 핸드폰 번호 있는지 체크
        const isExistUserByPhoneNumber: number = await this.userRepository.count({
          where: {
            phoneNumber: postSignUpRequest.phoneNumber,
            status: Status.ACTIVE,
          },
        });

        if (isExistUserByPhoneNumber > 0) {
          return RESPONSE.EXIST_PHONE_NUMBER;
        }

        // 가입한 닉네임 있는지 체크
        const isExistUserByNickname: number = await this.userRepository.count({
          where: {
            nickname: postSignUpRequest.nickname,
            status: Status.ACTIVE,
          },
        });

        if (isExistUserByNickname > 0) {
          return RESPONSE.EXIST_NICKNAME;
        }

        // 비밀번호 암호화
        const securityData: SecurityPassword = await saltHashPassword(postSignUpRequest.password);

        // UserInfo 인스턴스 생성후, 정보 담는 부분
        const userInfo: UserInfo = new UserInfo();
        userInfo.email = postSignUpRequest.email;
        userInfo.password = securityData.hashedPassword;
        userInfo.phoneNumber = postSignUpRequest.phoneNumber;
        userInfo.nickname = postSignUpRequest.nickname;
        userInfo.accountStatus = AccountStatus.ACTIVE;
        userInfo.status = Status.ACTIVE;
        userInfo.createdAt = defaultCurrentDateTime();
        userInfo.updatedAt = defaultCurrentDateTime();
        const createUserData: UserInfo = await queryRunner.manager.save(userInfo);

        // AdminSalt 인스턴스 생성후, 정보 담는 부분
        const userSalt: UserSalt = new UserSalt();
        userSalt.salt = securityData.salt;
        userSalt.userId = createUserData.id;
        await queryRunner.manager.save(userSalt);

        // Commit
        await queryRunner.commitTransaction();

        // Response의 result 객체에 Data를 담는 부분
        const data: PostSignUpResultData = {
          id: createUserData.id,
          email: createUserData.email,
        };

        return makeResponse(RESPONSE.SUCCESS, data);
      } catch (error) {
        // Rollback
        await queryRunner.rollbackTransaction();
        errorLogger(error, location, currentFunction);
        return RESPONSE.ERROR;
      } finally {
        await queryRunner.release();
      }
    } catch (error) {
      errorLogger(error, location, currentFunction);
    }
  }

  async editUser(patchAuthInfo: PatchAuthInfoRequest, payload: Payload) {
    currentFunction = 'editUser';
    try {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        // 가입한 닉네임 있는지 체크
        const isExistUserByNickname: number = await this.userRepository.count({
          where: {
            nickname: patchAuthInfo.nickname,
            id: Not(payload.id),
            status: Status.ACTIVE,
          },
        });

        if (isExistUserByNickname > 0) {
          return RESPONSE.EXIST_NICKNAME;
        }

        const user: UserInfo = await this.userRepository.findOne({
          where: {
            id: payload.id,
            status: Status.ACTIVE,
          },
        });

        user.nickname = patchAuthInfo.nickname;
        user.updatedAt = defaultCurrentDateTime();
        await queryRunner.manager.update(UserInfo, { id: user.id }, user);

        // Commit
        await queryRunner.commitTransaction();

        return makeResponse(RESPONSE.SUCCESS, undefined);
      } catch (error) {
        // Rollback
        await queryRunner.rollbackTransaction();
        errorLogger(error, location, currentFunction);
        return RESPONSE.ERROR;
      } finally {
        await queryRunner.release();
      }
    } catch (error) {
      errorLogger(error, location, currentFunction);
    }
  }

  async editPassword(patchUserPasswordRequest: PatchPasswordRequest) {
    currentFunction = 'editPassword';
    try {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        // 유저 정보 조회
        const user: UserInfo = await this.userRepository.findOne({
          where: {
            email: patchUserPasswordRequest.email,
            phoneNumber: patchUserPasswordRequest.phoneNumber,
            status: Status.ACTIVE,
          },
        });
        if (!user) {
          return RESPONSE.NON_EXIST_USER;
        }

        // 비밀번호 암호화
        const securityData: SecurityPassword = await saltHashPassword(patchUserPasswordRequest.password);

        // 유저 정보 수정
        user.password = securityData.hashedPassword;
        user.updatedAt = defaultCurrentDateTime();
        await queryRunner.manager.update(UserInfo, { id: user.id }, user);

        // 유저 소금값 조회 및 업데이트
        const userSalt: UserSalt = await this.userSaltRepository.findOne({
          where: { userId: user.id },
        });
        userSalt.salt = securityData.salt;

        await queryRunner.manager.update(UserSalt, { userId: user.id }, userSalt);

        // Commit
        await queryRunner.commitTransaction();

        return makeResponse(RESPONSE.SUCCESS, undefined);
      } catch (error) {
        // Rollback
        await queryRunner.rollbackTransaction();
        errorLogger(error, location, currentFunction);
        return RESPONSE.ERROR;
      } finally {
        await queryRunner.release();
      }
    } catch (error) {
      errorLogger(error, location, currentFunction);
    }
  }

  async removeUser(payload: Payload) {
    currentFunction = 'removeUser';
    try {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        const user: UserInfo = await this.userRepository.findOne({
          where: {
            id: payload.id,
            status: Status.ACTIVE,
          },
        });

        user.status = Status.INACTIVE;
        user.accountStatus = AccountStatus.INACTIVE;
        user.updatedAt = defaultCurrentDateTime();
        await queryRunner.manager.update(UserInfo, { id: user.id }, user);

        // Commit
        await queryRunner.commitTransaction();

        return makeResponse(RESPONSE.SUCCESS, undefined);
      } catch (error) {
        // Rollback
        await queryRunner.rollbackTransaction();
        errorLogger(error, location, currentFunction);
        return RESPONSE.ERROR;
      } finally {
        await queryRunner.release();
      }
    } catch (error) {
      errorLogger(error, location, currentFunction);
    }
  }
}
