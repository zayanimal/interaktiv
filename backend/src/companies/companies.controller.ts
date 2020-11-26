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
import { CompaniesService } from '@companies/services/companies.service';
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

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    remove(@Param('id') id: string) {
        return this.companiesService.remove(id);
    }

    @Get(':company')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    search(@Param('company') name: string) {
        return this.companiesService.search(name);
    }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    getCompany(@Query('editable') id: string) {
        return this.companiesService.getFullCompany(id);
    }
}
