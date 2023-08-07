/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(config : ConfigService) {  // since we are extending a class
        super({
            jwtFormRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('SECRET_KEY')
        })
    }
}
