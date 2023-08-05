/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";


@Injectable()
export class PrismaService extends PrismaClient { //  A CLASS THAT ALLOWS TO CONNECT TO THE DATABASE
    constructor() {
        super({
            datasources : {
                db : {
                    url : "postgresql://postgres:123@localhost:5434/nest?schema=public"
                },
            },
        });
    }
} 
