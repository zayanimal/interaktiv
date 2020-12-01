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
import { BankService } from '@company/bank/bank.service';
import { BankDto } from '@company/bank/bank.dto';

@Controller('bank')
export class BankController {
    constructor(private bankService: BankService) {}

    /**
     * Создать новый банк компании
     * @param id айди реквизитов
     * @param bank
     */
    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    create(
        @Param('id', ParseUUIDPipe) id: string,
        @Body(ValidationPipe) bank: BankDto
    ) {
        return this.bankService.create([bank], id);
    }

    /**
     * Удалить банк компании
     * @param id айди банка
     */
    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.bankService.remove(id);
    }
}
