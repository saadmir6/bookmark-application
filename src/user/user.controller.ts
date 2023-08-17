/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

// path( /user/me )
@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
    constructor(private userService : UserService) {}
    @Get('me')
    getMe(@GetUser() user : User) {
        return user;
    }

    @Patch()
    editUser(
        @GetUser('id') UserId : number,
        @Body() dto : EditUserDto,
    ){
        return this.userService.editUser(UserId, dto);
    }


}
