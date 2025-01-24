import { Injectable } from '@nestjs/common';
import { GetUsersRequest } from './dto/request/get-users.request';
import { GetUsersDetailRequest } from './dto/request/get-users-detail.request';

@Injectable()
export class UserQuery {
  retrieveUsers = (getUsersRequest: GetUsersRequest, offset: number) => {
    let retrieveUsersQuery = `
        select id,
               email,
               phoneNumber,
               nickname,
               createdAt,
               status
        from UserInfo
        where UserInfo.accountStatus = '활동계정'
    `;

    if (getUsersRequest.nickname != undefined) {
      retrieveUsersQuery += `and nickname like'%${getUsersRequest.nickname}%'`;
    }

    if (getUsersRequest.sortType != undefined) {
      retrieveUsersQuery += `\norder by UserInfo.createdAt ${getUsersRequest.sortType}`;
    }

    const retrieveUsersCountQuery = retrieveUsersQuery + ';';

    const pageQuery = `
            limit ${offset}, ${getUsersRequest.size};
        `;

    retrieveUsersQuery += pageQuery;
    return {
      retrieveUsersQuery: retrieveUsersQuery,
      retrieveUsersCountQuery: retrieveUsersCountQuery,
    };
  };

  retrieveUserById = (getUsersDetailRequest: GetUsersDetailRequest) => {
    return `
        select id,
               email,
               phoneNumber,
               nickname,
               createdAt,
               status
        from UserInfo
        where id = ${getUsersDetailRequest.userId};
    `;
  };
}
