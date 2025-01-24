import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Controller, Patch, Body, Headers } from '@nestjs/common';

// 유저 정보 수정 Mock DTO
class UpdateUserDto {
  nickname: string;
}

// 유저 정보 수정 Mock Controller
@Controller('auth/v1')
class MockAuthController {
  @Patch()
  updateUser(@Body() body: UpdateUserDto, @Headers('x-access-token') token: string) {
    if (!token || token === 'invalid') {
      return {
        isSuccess: false,
        code: 2000,
        message: 'JWT 토큰을 확인해주세요.',
      };
    }

    if (!body.nickname) {
      return {
        isSuccess: false,
        code: 2011,
        message: '닉네임을 입력해주세요.',
      };
    }

    if (body.nickname.length > 20) {
      return {
        isSuccess: false,
        code: 2014,
        message: '닉네임이 20자를 초과합니다.',
      };
    }

    if (body.nickname === '이미사용중') {
      return {
        isSuccess: false,
        code: 2018,
        message: '이미 사용중인 닉네임입니다.',
      };
    }

    return {
      isSuccess: true,
      code: 1000,
      message: '성공',
    };
  }
}

// 유저 정보 수정 테스트 코드
describe('Auth API (e2e) - Mock Data', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [MockAuthController], // Mock Controller 등록
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('PATCH /auth/v1', () => {
    it('should return success when valid data is provided', async () => {
      const response = await request(app.getHttpServer())
        .patch('/auth/v1')
        .set('x-access-token', 'valid-jwt-token')
        .send({
          nickname: '테디',
        })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual({
        isSuccess: true,
        code: 1000,
        message: '성공',
      });
    });

    it('should return 2000 when JWT token is missing or invalid', async () => {
      const response = await request(app.getHttpServer())
        .patch('/auth/v1')
        .set('x-access-token', 'invalid')
        .send({
          nickname: '테디',
        })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual({
        isSuccess: false,
        code: 2000,
        message: 'JWT 토큰을 확인해주세요.',
      });
    });

    it('should return 2011 when nickname is missing', async () => {
      const response = await request(app.getHttpServer())
        .patch('/auth/v1')
        .set('x-access-token', 'valid-jwt-token')
        .send({})
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual({
        isSuccess: false,
        code: 2011,
        message: '닉네임을 입력해주세요.',
      });
    });

    it('should return 2014 when nickname exceeds 20 characters', async () => {
      const response = await request(app.getHttpServer())
        .patch('/auth/v1')
        .set('x-access-token', 'valid-jwt-token')
        .send({
          nickname: '123456789012345678901',
        })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual({
        isSuccess: false,
        code: 2014,
        message: '닉네임이 20자를 초과합니다.',
      });
    });

    it('should return 2018 when nickname is already in use', async () => {
      const response = await request(app.getHttpServer())
        .patch('/auth/v1')
        .set('x-access-token', 'valid-jwt-token')
        .send({
          nickname: '이미사용중',
        })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual({
        isSuccess: false,
        code: 2018,
        message: '이미 사용중인 닉네임입니다.',
      });
    });
  });
});
