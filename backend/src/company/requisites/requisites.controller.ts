import {
    Controller,
    Delete,
    Put,
    Body,
    Param,
    UseGuards,
    ParseUUIDPipe,
    ValidationPipe
} from '@nestjs/common';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Roles } from '@auth/decorators/roles.decorator';
import { RequisitesService } from '@company/requisites/requisites.service';
import { RequisitesDto } from '@company/requisites/requisites.dto';

@Controller('requisites')
export class RequisitesController {
    constructor(private requisitesService: RequisitesService) {}

    /**
     * Добавить реквизиты компании
     * @param id айди компании
     * @param requisites
     */
    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    create(
        @Param('id', ParseUUIDPipe) id: string,
        @Body(ValidationPipe) requisites: RequisitesDto
    ) {
        return this.requisitesService.create([requisites], id);
    }

    /**
     * Удалить реквизиты компании
     * @param id айди реквизитов
     */
    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.requisitesService.remove(id);
    }
}
