/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "src/auth/dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor (private prisma : PrismaService,
               private jwt : JwtService,
               private config : ConfigService  
               ) {}

  async signup(dto : AuthDto) {  // the function is async because we are calling prisma 
   try{

     const hash = await argon.hash(dto.password) // to generate a hash for the password
  
     const user = await this.prisma.user.create({  // to create a new user in te DB
       data : {
         email : dto.email,
         hash,
       },
     });

     return this.signToken(user.id, user.email)
   
  } catch(error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code == 'P2002') {
        throw new ForbiddenException("Creadential already taken")
      };
    }
    throw error;
  };
}

  

  async signin(dto : AuthDto) {

    const user = await this.prisma.user.findUnique({
      where : {
        email : dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException("User doesn't exist!")
    };

    const pwMatches = await argon.verify(user.hash, dto.password);

    if (!pwMatches) {
      throw new ForbiddenException("Wrong password!")
    };

    return this.signToken(user.id, user.email)
    
  }

  async signToken(userId : number, email : string) : Promise<{access_token: string}> {

    const payload = {
      sub : userId,
      email
    }

    const secret = this.config.get('SECRET_KEY')

    const token = await this.jwt.signAsync(payload, {
      expiresIn : '15m',
      secret : secret
    })


    return {
      access_token : token,
    };
  }
}
