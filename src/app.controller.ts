/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, // private readonly jwtService: JwtService,
  ) {}

  // @UseGuards(JwtAuthGuard)
  // @Get()
  // getHello(@Request() req): string {
  //   return req.user;
  // }
}
