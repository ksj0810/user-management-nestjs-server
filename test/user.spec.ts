import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Controller, Get, Query, Param, Headers } from '@nestjs/common';

// 유저 조회 API Mock Controller
@Controller('users/v1')
class MockUsersController {
  @Get()
  findUsers(@Query() query: any) {
    if (!query.page || !query.size || !query.sortType) {
      return {
        isSuccess: false,
        code: 400,
        message: 'Missing required parameters',
      };
    }

    if (query.token === 'invalid') {
      return {
        isSuccess: false,
        code: 2000,
        message: 'JWT 토큰을 확인해주세요.',
      };
    }

    return {
      isSuccess: true,
      code: 1000,
      message: '성공',
      result: {
        users: [
          {
            id: 1,
            email: 'abc123@gmail.com',
            phoneNumber: '010-1111-1111',
            nickname: '테디',
            createdAt: '2024-11-25 15:43:53',
            status: 'ACTIVE',
          },
        ],
        totalCount: 20,
      },
    };
  }
}

// 유저 상세 조회 API Mock Controller
@Controller('users/v1')
class MockUserController {
  @Get(':userId')
  findUserById(@Param('userId') userId: number, @Headers('x-access-token') token: string) {
    if (!token || token === 'invalid') {
      return {
        isSuccess: false,
        code: 2000,
        message: 'JWT 토큰을 확인해주세요.',
      };
    }

    if (Number(userId) !== 1) {
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
      result: {
        id: 1,
        email: 'abc123@gmail.com',
        phoneNumber: '010-1111-1111',
        nickname: '테디',
        createdAt: '2024-11-25 15:43:53',
        status: 'ACTIVE',
      },
    };
  }
}

// 유저 조회 API 테스트 코드
describe('Users API (e2e) - Mock Data', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [MockUsersController], // Mock Controller만 등록
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /users/v1', () => {
    it('should return paginated users with correct content type', async () => {
      const queryParams = {
        page: 1,
        size: 10,
        sortType: 'desc',
        token: 'valid', // 유효한 토큰
      };

      const response = await request(app.getHttpServer())
        .get('/users/v1')
        .query(queryParams)
        .expect('Content-Type', /json/) // Content-Type 확인
        .expect(200); // 상태 코드 확인

      expect(response.body).toEqual({
        isSuccess: true,
        code: 1000,
        message: '성공',
        result: {
          users: [
            {
              id: 1,
              email: 'abc123@gmail.com',
              phoneNumber: '010-1111-1111',
              nickname: '테디',
              createdAt: '2024-11-25 15:43:53',
              status: 'ACTIVE',
            },
          ],
          totalCount: 20,
        },
      });
    });

    it('should return 400 when required query parameters are missing', async () => {
      const queryParams = {
        size: 10, // page가 누락됨
        sortType: 'desc',
      };

      const response = await request(app.getHttpServer())
        .get('/users/v1')
        .query(queryParams)
        .expect(200); // 상태 코드 확인

      expect(response.body).toEqual({
        isSuccess: false,
        code: 400,
        message: 'Missing required parameters',
      });
    });

    it('should return 401 when JWT token is invalid', async () => {
      const queryParams = {
        page: 1,
        size: 10,
        sortType: 'desc',
        token: 'invalid', // 잘못된 토큰
      };

      const response = await request(app.getHttpServer())
        .get('/users/v1')
        .query(queryParams)
        .expect(200); // 상태 코드 확인

      expect(response.body).toEqual({
        isSuccess: false,
        code: 2000,
        message: 'JWT 토큰을 확인해주세요.',
      });
    });
  });
});

// 유저 상세 조회 API 테스트 코드
describe('User API (e2e) - Mock Data', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [MockUserController], // Mock Controller만 등록
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /users/v1/:userId', () => {
    it('should return user details with correct content type', async () => {
      const response = await request(app.getHttpServer())
        .get('/users/v1/1')
        .set('x-access-token', 'valid-jwt-token')
        .expect('Content-Type', /json/) // Content-Type 확인
        .expect(200); // 상태 코드 확인

      expect(response.body).toEqual({
        isSuccess: true,
        code: 1000,
        message: '성공',
        result: {
          id: 1,
          email: 'abc123@gmail.com',
          phoneNumber: '010-1111-1111',
          nickname: '테디',
          createdAt: '2024-11-25 15:43:53',
          status: 'ACTIVE',
        },
      });
    });

    it('should return 401 when JWT token is invalid', async () => {
      const response = await request(app.getHttpServer())
        .get('/users/v1/1')
        .set('x-access-token', 'invalid')
        .expect(200); // 상태 코드 확인 (Mock에서는 에러도 200으로 처리)

      expect(response.body).toEqual({
        isSuccess: false,
        code: 2000,
        message: 'JWT 토큰을 확인해주세요.',
      });
    });

    it('should return 404 when user does not exist', async () => {
      const response = await request(app.getHttpServer())
        .get('/users/v1/999') // 존재하지 않는 userId
        .set('x-access-token', 'valid-jwt-token')
        .expect(200); // 상태 코드 확인 (Mock에서는 에러도 200으로 처리)

      expect(response.body).toEqual({
        isSuccess: false,
        code: 2013,
        message: '존재하지 않는 유저입니다.',
      });
    });
  });
});
