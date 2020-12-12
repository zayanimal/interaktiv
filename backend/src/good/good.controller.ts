import {
    Controller,
    Post,
    UseGuards,
    UseInterceptors,
    UploadedFile,
    Body,
    Get,
    Param
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Roles } from '@auth/decorators/roles.decorator';
import { GoodService } from '@good/good.service';
import { SearchPipe } from '@shared/pipes/search.pipe';

@Controller('good')
export class GoodController {
    constructor(private goodService: GoodService) {}

    @Post('upload')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
    createFromFile(
        @UploadedFile() { buffer }: { buffer: ArrayBuffer },
        @Body() { vendor }: { vendor: string }
    ) {
        return this.goodService.updatePricelist(buffer, vendor);
    }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    list() {
        return this.goodService.list();
    }

    @Get(':name')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    search(@Param('name', SearchPipe) name: string) {
        return this.goodService.search(name);
    }
}
