/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
    constructor(private prisma : PrismaService) {}

    async editUser (
        UserId : number,
        dto : EditUserDto,
    ) {
        const user = await this.prisma.user.update({
            where : {
                id : UserId,
            },
            data : {
                ...dto,
            },
        });
        delete user.hash;

        return user;
    }
}
