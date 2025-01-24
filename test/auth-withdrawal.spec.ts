import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Controller, Patch, Headers } from '@nestjs/common';

// 회원 탈퇴 Mock Controller
@Controller('auth/v1')
class MockAuthController {
  @Patch('status')
  deactivateUser(@Headers('x-access-token') token: string) {
    if (!token || token === 'invalid') {
      return {
        isSuccess: false,
        code: 2000,
        message: 'JWT 토큰을 확인해주세요.',
      };
    }

    if (token === 'nonexistent') {
      return {
        isSuccess: false,
        code: 2013,
        message: '존재하지 않는 유저입니다.',
      };
    }

    return {
      isSuccess: true,
      code: 1000,
      message: '성공',
    };
  }
}

// 회원 탈퇴 테스트 코드
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

  describe('PATCH /auth/v1/status', () => {
    it('should return success when valid token is provided', async () => {
      const response = await request(app.getHttpServer())
        .patch('/auth/v1/status')
        .set('x-access-token', 'valid-jwt-token')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual({
        isSuccess: true,
        code: 1000,
        message: '성공',
      });
    });

    it('should return 2000 when JWT token is invalid', async () => {
      const response = await request(app.getHttpServer())
        .patch('/auth/v1/status')
        .set('x-access-token', 'invalid')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual({
        isSuccess: false,
        code: 2000,
        message: 'JWT 토큰을 확인해주세요.',
      });
    });

    it('should return 2013 when user does not exist', async () => {
      const response = await request(app.getHttpServer())
        .patch('/auth/v1/status')
        .set('x-access-token', 'nonexistent')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual({
        isSuccess: false,
        code: 2013,
        message: '존재하지 않는 유저입니다.',
      });
    });
  });
});
