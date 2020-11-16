import {
    Controller,
    Get,
    Put,
    Delete,
    Param,
    Query,
    UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Roles } from '@auth/decorators/roles.decorator';
import { DictionaryAdminService } from '@dictionary/services/dictionaryAdmin.service';
import { AdminDictDto } from '@dictionary/dto/adminDict.dto';

@Controller('dictionary/admin')
export class DictionaryAdminController {
    constructor(private dictionaryAdminService: DictionaryAdminService) {}

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    getAdminDictionary(@Query() adminDictDto: AdminDictDto) {
        return this.dictionaryAdminService.getAdminDictinaries(adminDictDto);
    }

    @Put(':create')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    createDictionary(@Param('create') create: string) {
        return this.dictionaryAdminService.createAdminDictionary(create);
    }

    @Delete(':remove')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    removeDictionary(@Param('remove') remove: string) {
        return this.dictionaryAdminService.removeAdminDictionary(remove);
    }
}
