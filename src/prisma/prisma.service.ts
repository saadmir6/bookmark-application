/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaClient } from "@prisma/client";


@Injectable()
export class PrismaService extends PrismaClient { //  A CLASS THAT ALLOWS TO CONNECT TO THE DATABASE
    constructor(config : ConfigService) {
        super({
            datasources : {
                db : {
                    url : config.get('DATABASE_URL'),
                },
            },
        });
    }
} 
