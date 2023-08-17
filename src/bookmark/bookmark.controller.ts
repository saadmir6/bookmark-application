/* eslint-disable prettier/prettier */

import { Controller, Get, Patch, Post, Delete, UseGuards, Param, ParseIntPipe, Body } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from 'src/auth/decorator';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {

    constructor(private bookmarksService : BookmarkService) {}

    @Post()
    createBookmark(
        @GetUser('id') userId : number,
        @Body() dto : CreateBookmarkDto
        ) {
            return this.bookmarksService.createBookmark(
                userId, 
                dto
            )
        }

    @Get()
    getBookmark(
        @GetUser('id') userId : number
        ) {
            return this.bookmarksService.getBookmark(
                userId,
            )
        }

    @Get(':id')
    getBookmarkById(
        @GetUser('id') userId : number,
        @Param('id', ParseIntPipe) bookmarkId : number
        ) {
            return this.bookmarksService.getBookmarkById(
                userId,
                bookmarkId
            )
        }

    @Patch()
    editBookmarkById(
        @GetUser('id') userId : number,
        @Param('id', ParseIntPipe) bookmarkId : number,
        @Body() dto : EditBookmarkDto
        ) {
            return this.bookmarksService.editBookmarkById(
                userId,
                bookmarkId, 
                dto
            )
        }
    
    @Delete(':id')
    deleteBookmarkById(
        @GetUser('id') userId : number,
        @Param('id', ParseIntPipe) bookmarkId : number
        ) {
            return this.bookmarksService.deleteBookmarkById(
                userId, 
                bookmarkId
            )
        }
}
