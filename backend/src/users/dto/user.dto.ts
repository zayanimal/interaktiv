import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserDto {
    @IsNotEmpty()
    username!: string;

    @IsOptional()
    @IsString()
    userId?: string;

    @IsOptional()
    @IsString()
    companyId?: string | null;

    @IsNotEmpty()
    role!: string;

    @IsNotEmpty()
    permissions!: string[];
}
