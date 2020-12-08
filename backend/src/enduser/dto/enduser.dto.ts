import { IsNotEmpty, IsString } from 'class-validator';

export class EnduserDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsString()
    city!: string;
}
