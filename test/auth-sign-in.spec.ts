import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Controller, Post, Body } from '@nestjs/common';

// 회원가입 Mock Dto
class SignUpDto {
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  nickname: string;
}

// 회원가입 Mock Controller
@Controller('auth/v1')
class MockAuthController {
  @Post('sign-up')
  signUp(@Body() body: SignUpDto) {
    const { email, password, confirmPassword, phoneNumber, nickname } = body;

    if (!email) {
      return {
        isSuccess: false,
        code: 2004,
        message: '이메일을 입력해주세요.',
      };
    }

    if (password !== confirmPassword) {
      return {
        isSuccess: false,
        code: 2010,
        message: '확인 비밀번호와 일치하지 않습니다.',
      };
    }

    if (!nickname) {
      return {
        isSuccess: false,
        code: 2011,
        message: '닉네임을 입력해주세요.',
      };
    }

    return {
      isSuccess: true,
      code: 1000,
      message: '성공',
      result: {
        id: 1,
        email,
      },
    };
  }
}

// 회원가입 테스트 코드
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

  describe('POST /auth/v1/sign-up', () => {
    it('should return success when valid data is provided', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/v1/sign-up')
        .send({
          email: 'abc123@gmail.com',
          password: 'teddy1234',
          confirmPassword: 'teddy1234',
          phoneNumber: '010-1111-1111',
          nickname: '테디',
        })
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toEqual({
        isSuccess: true,
        code: 1000,
        message: '성공',
        result: {
          id: 1,
          email: 'abc123@gmail.com',
        },
      });
    });

    it('should return 2004 when email is missing', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/v1/sign-up')
        .send({
          password: 'teddy1234',
          confirmPassword: 'teddy1234',
          phoneNumber: '010-1111-1111',
          nickname: '테디',
        })
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toEqual({
        isSuccess: false,
        code: 2004,
        message: '이메일을 입력해주세요.',
      });
    });

    it('should return 2010 when passwords do not match', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/v1/sign-up')
        .send({
          email: 'abc123@gmail.com',
          password: 'teddy1234',
          confirmPassword: 'teddy5678', // 비밀번호 불일치
          phoneNumber: '010-1111-1111',
          nickname: '테디',
        })
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toEqual({
        isSuccess: false,
        code: 2010,
        message: '확인 비밀번호와 일치하지 않습니다.',
      });
    });

    it('should return 2011 when nickname is missing', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/v1/sign-up')
        .send({
          email: 'abc123@gmail.com',
          password: 'teddy1234',
          confirmPassword: 'teddy1234',
          phoneNumber: '010-1111-1111',
        })
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toEqual({
        isSuccess: false,
        code: 2011,
        message: '닉네임을 입력해주세요.',
      });
    });
  });
});
