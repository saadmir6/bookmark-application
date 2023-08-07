/* eslint-disable prettier/prettier */

import { Controller, Get } from '@nestjs/common';

// path( /user/me )
@Controller('user')
export class UserController {
    @Get('me')
    getMe() {
        return 'user info';
    }
}
