/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "src/dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class AuthService {
  constructor (private prisma : PrismaService) {
    
  }

  async signup(dto : AuthDto) {  // the function is async because we are calling prisma 
   try{

     const hash = await argon.hash(dto.password) // to generate a hash for the password
  
     const user = await this.prisma.user.create({  // to create a new user in te DB
       data : {
         email : dto.email,
         hash,
       },
     });
  
     delete user.hash // does not return the generated hash
  
     return user;
   
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

    delete user.hash;
    return user;
    
  }
}
