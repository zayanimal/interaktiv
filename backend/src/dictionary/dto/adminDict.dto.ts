import { IsNotEmpty } from 'class-validator';

export class AdminDictDto {
    @IsNotEmpty()
    dicts: string;
}
