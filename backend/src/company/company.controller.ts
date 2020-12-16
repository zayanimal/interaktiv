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
    ValidationPipe
} from '@nestjs/common';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Roles } from '@auth/decorators/roles.decorator';
import { CompanyService } from '@company/company.service';
import { CreateCompanyDto } from '@company/dto/createCompany.dto';
import { SearchPipe } from '@shared/pipes/search.pipe';

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    /**
     * Создание новой компании
     * @param company
     */
    @Put()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    create(@Body(ValidationPipe) company: CreateCompanyDto) {
        return this.companyService.create(company);
    }

    /**
     * Редактирование компании
     * @param id
     * @param data
     */
    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    update(
        @Param('id') id: string,
        @Body(ValidationPipe) data: CreateCompanyDto
    ) {
        return this.companyService.update(id, data);
    }

    /**
     * Удаление компании
     * @param id
     */
    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.companyService.remove(id);
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
        return this.companyService.list(page, limit);
    }

    /**
     * Поиск компании по названию
     * @param name
     */
    @Get('search-name/:name')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    search(@Param('name', SearchPipe) name: string) {
        return this.companyService.search(name);
    }

    /**
     * Данные о компании со всеми зависимостями
     * @param id
     */
    @Get('search-id/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    getCompany(@Param('id', ParseUUIDPipe) id: string) {
        return this.companyService.getFullCompany(id);
    }
}
