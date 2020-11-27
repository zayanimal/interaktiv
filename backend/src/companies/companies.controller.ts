import {
    Controller,
    Delete,
    Get,
    Put,
    Body,
    Param,
    Query,
    UseGuards,
    ParseIntPipe,
    ParseUUIDPipe,
    ValidationPipe,
    Patch
} from '@nestjs/common';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Roles } from '@auth/decorators/roles.decorator';
import { CompaniesService } from '@companies/services/companies.service';
import { CreateCompanyDto } from '@companies/dto/createCompany.dto';

@Controller('companies')
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) {}

    /**
     * Создание новой компании
     * @param company
     */
    @Put()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    create(@Body(ValidationPipe) company: CreateCompanyDto) {
        return this.companiesService.create(company);
    }

    /**
     * Редактирование компании
     * @param id
     * @param data
     */
    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    update(
        @Param('id') id: string,
        @Body(ValidationPipe) data: CreateCompanyDto
    ) {
        return this.companiesService.update(id, data);
    }

    /**
     * Удаление компании
     * @param id
     */
    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.companiesService.remove(id);
    }

    /**
     * Список компаний
     * @param page
     * @param limit
     */
    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    list(
        @Query('page', ParseIntPipe) page: number,
        @Query('limit', ParseIntPipe) limit: number
    ) {
        return this.companiesService.list(page, limit);
    }

    /**
     * Поиск компании по названию
     * @param name
     */
    @Get('search-name/:name')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    search(@Param('name') name: string) {
        return this.companiesService.search(name);
    }

    /**
     * Данные о компании со всеми зависимостями
     * @param id
     */
    @Get('search-id/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    getCompany(@Param('id', ParseUUIDPipe) id: string) {
        return this.companiesService.getFullCompany(id);
    }
}
