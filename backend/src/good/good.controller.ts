import {
    Controller,
    Post,
    UseGuards,
    UseInterceptors,
    UploadedFile,
    BadRequestException,
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
        return this.goodService.createFromFile(buffer, vendor);
    }

    @Get(':name')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    list(@Param('name', SearchPipe) name: string) {
        return this.goodService.search(name);
    }
}
