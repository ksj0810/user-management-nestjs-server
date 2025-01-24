import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from '../entity/user-info.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserQuery } from './user.query';

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo])],
  controllers: [UserController],
  providers: [UserService, UserQuery],
})
export class UserModule {}
