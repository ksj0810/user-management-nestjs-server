import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { RESPONSE } from 'config/response.utils';
import { GetUsersRequest } from '../user/dto/request/get-users.request';
import { GetUsersDetailRequest } from '../user/dto/request/get-users-detail.request';

// User관련 데코레이터
export const GetUsers = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const getUsersQueryData: GetUsersRequest = ctx.switchToHttp().getRequest().query;
    if (!getUsersQueryData.page) {
      throw new HttpException(RESPONSE.PAGE_EMPTY, 200);
    }
    if (getUsersQueryData.page <= 0) {
      throw new HttpException(RESPONSE.INVALID_PAGE, 200);
    }
    if (!getUsersQueryData.size) {
      throw new HttpException(RESPONSE.PAGE_SIZE_EMPTY, 200);
    }
    if (getUsersQueryData.size <= 0) {
      throw new HttpException(RESPONSE.INVALID_PAGE_SIZE, 200);
    }
    if (!getUsersQueryData.sortType) {
      throw new HttpException(RESPONSE.SORT_TYPE_EMPTY, 200);
    }
    if (
      getUsersQueryData.sortType !== 'desc' &&
      getUsersQueryData.sortType !== 'asc'
    ) {
      throw new HttpException(RESPONSE.INVALID_SORT_TYPE, 200);
    }

    return getUsersQueryData;
  },
);

export const GetUsersDetail = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const getUsersDetailParamsData: GetUsersDetailRequest = ctx
      .switchToHttp()
      .getRequest().params;
    if (!getUsersDetailParamsData.userId) {
      throw new HttpException(RESPONSE.EMPTY_USER_ID, 200);
    }
    if (
      getUsersDetailParamsData.userId <= 0 ||
      isNaN(getUsersDetailParamsData.userId)
    ) {
      throw new HttpException(RESPONSE.INVALID_USER_ID, 200);
    }
    return getUsersDetailParamsData;
  },
);
