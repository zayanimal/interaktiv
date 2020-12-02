import { IsNotEmpty } from 'class-validator';

export class EnduserDto {
    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    city!: string;
}
