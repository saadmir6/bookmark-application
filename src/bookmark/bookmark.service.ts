/* eslint-disable prettier/prettier */

import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {
    
    constructor(private prisma : PrismaService) {}

    async createBookmark(userId : number, dto : CreateBookmarkDto) {
        const bookmark = await this.prisma.bookMark.create({
            data : {
                userId,
                ...dto
            }
        })
        return bookmark;
    }

    getBookmark(userId : number) {
        return this.prisma.bookMark.findMany({
            where : {
                userId,
            }
        })
    }

    getBookmarkById(userId : number, bookmarkId : number) 
    {
        return this.prisma.bookMark.findFirst({
        where : {
            id : bookmarkId,
            userId,

        }
    })}

    async editBookmarkById(userId : number,bookmarkId : number, dto : EditBookmarkDto) {
        
        const bookmark = await this.prisma.bookMark.findUnique({
            where : {
                id : bookmarkId,
                userId,
                ...dto
            }
        })
        if (!bookmark || bookmark.userId !== userId) {
            throw new ForbiddenException("Denied");
        }

        return this.prisma.bookMark.update({
            
            where : {
                id : bookmarkId,
            },
            data : {
                ...dto,
            }
        })
        
    }
    
    async deleteBookmarkById(userId : number, bookmarkId : number) {
        const bookmark = await this.prisma.bookMark.findUnique({
            where : {
                id : bookmarkId,
                
            }
        })
        if (!bookmark || bookmark.userId !== userId) {
            throw new ForbiddenException("Denied");
        }

        await this.prisma.bookMark.delete({
            where : {
                id : bookmarkId,
            }
        })


    }
}
