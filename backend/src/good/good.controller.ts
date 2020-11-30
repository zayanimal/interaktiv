import {
    Controller,
    Post,
    UseGuards,
    UseInterceptors,
    UploadedFile,
    Body
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Roles } from '@auth/decorators/roles.decorator';
import { GoodService } from '@good/good.service';

@Controller('good')
export class GoodController {
    constructor(private goodService: GoodService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: memoryStorage()
    }))
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    createFromFile(
        @UploadedFile() { buffer }: { buffer: ArrayBuffer },
        @Body() { vendor }: { vendor: string }
    ) {
        return this.goodService.createFromFile(buffer, vendor);
    }
}
