/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBookmarkDto {
    @IsString()
    @IsNotEmpty()
    title : string

    @IsString()
    @IsOptional()
    description? : string

    @IsNotEmpty()
    @IsString()
    link : string
}