import {
    Controller,
    Delete,
    Get,
    Put,
    Body,
    Param,
    Query,
    UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Roles } from '@auth/decorators/roles.decorator';
import { CompaniesService } from '@companies/companies.service';
import { CreateCompanyDto } from '@companies/dto/createCompanyDto';

@Controller('companies')
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) {}

    @Put()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    create(@Body() company: CreateCompanyDto) {
        return this.companiesService.create(company);
    }

    @Get(':company')
    search(@Param('company') name: string) {
        return this.companiesService.search(name);
    }
}
