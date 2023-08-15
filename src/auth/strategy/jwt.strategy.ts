/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    'jwt',) {   // default name
    constructor(config : ConfigService, private prisma : PrismaService) {  // since we are extending a class
        super({
            jwtFormRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('SECRET_KEY')
        })

    }

    async validate(payload : {sub : number, email : string}) {
        const user =  await this.prisma.user.findUnique({
            where : {
                id : payload.sub,
            },
        });
        delete user.hash;
        return user;
    }
}
