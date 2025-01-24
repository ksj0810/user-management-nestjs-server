import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { makeKSTToDateComponent, makeResponse } from '../../common/function.utils';
import { RESPONSE } from '../../config/response.utils';
import { UserInfo } from '../entity/user-info.entity';
import { DataSource, Repository } from 'typeorm';
import { GetUsersRequest } from './dto/request/get-users.request';
import { UserQuery } from './user.query';
import { errorLogger } from '../../config/logger/logger.function';
import { GetUsersDetailRequest } from './dto/request/get-users-detail.request';
import { GetUsersResultData, Users } from './dto/response/get-users.response';
import { DateComponent } from '../../common/variable.utils';
import { GetUsersDetailResultData } from './dto/response/get-users-detail.response';

const location: string = __dirname + '/user.service.ts';
let currentFunction: string;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userRepository: Repository<UserInfo>,
    private userQuery: UserQuery,
    private connection: DataSource,
  ) {}

  async retrieveUsers(getUsersRequest: GetUsersRequest) {
    currentFunction = 'retrieveUsers';
    try {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      try {
        const offset: number = getUsersRequest.size * (getUsersRequest.page - 1);
        const users: Array<Users> = await queryRunner.query(
          this.userQuery.retrieveUsers(
            getUsersRequest,
            offset,
          ).retrieveUsersQuery,
        );

        let dateFormat: DateComponent;
        for (const item of users) {
          dateFormat = makeKSTToDateComponent(item.createdAt);
          item.createdAt = `${dateFormat.year}-${dateFormat.month}-${dateFormat.day} ${dateFormat.hour}:${dateFormat.min}:${dateFormat.sec}`;
        }

        const totalCount: Array<Users> = await queryRunner.query(
          this.userQuery.retrieveUsers(
            getUsersRequest,
            offset,
          ).retrieveUsersCountQuery,
        );

        const data: GetUsersResultData = {
          users: users,
          totalCount: totalCount.length,
        };

        return makeResponse(RESPONSE.SUCCESS, data);
      } catch (error) {
        errorLogger(error, location, currentFunction);
        return RESPONSE.ERROR;
      } finally {
        await queryRunner.release();
      }
    } catch (error) {
      errorLogger(error, location, currentFunction);
    }
  }

  async retrieveUserById(getUsersDetailRequest: GetUsersDetailRequest) {
    currentFunction = 'retrieveUserById';
    try {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      try {
        const [user]: Array<GetUsersDetailResultData> = await queryRunner.query(
          this.userQuery.retrieveUserById(getUsersDetailRequest),
        );

        if (!user) {
          return RESPONSE.NON_EXIST_USER;
        }

        const dateFormat: DateComponent = makeKSTToDateComponent(user.createdAt);
        user.createdAt = `${dateFormat.year}-${dateFormat.month}-${dateFormat.day} ${dateFormat.hour}:${dateFormat.min}:${dateFormat.sec}`;

        return makeResponse(RESPONSE.SUCCESS, user);
      } catch (error) {
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
