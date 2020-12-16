import { Observable } from 'rxjs';
import {
    Controller,
    UseGuards,
    Body,
    Get,
    Delete,
    Param,
    Query,
    Put,
    ValidationPipe,
    ParseIntPipe,
    ParseUUIDPipe,
    UsePipes
} from '@nestjs/common';
import { User } from '@shared/decorators/user.decorator';
import { UserDto } from '@users/dto/user.dto';
import { OrderService } from '@order/order.service';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Roles } from '@auth/decorators/roles.decorator';
import { CreateOrderDto } from '@order/dto/create-order.dto';
import { UpdateOrderDto } from '@order/dto/update-order.dto';

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Put()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'customer')
    create(
        @Body(ValidationPipe) dto: CreateOrderDto,
        @User() user: Observable<UserDto>
    ) {
        return this.orderService.create(dto, user);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    find(@Param('id', ParseUUIDPipe) id: string) {
        return this.orderService.find(id);
    }

    @Put('update')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    update(
        @Body() dto: UpdateOrderDto,
        @User() user: Observable<UserDto>
    ) {
        return this.orderService.update(dto, user);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'customer')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.orderService.remove(id);
    }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    list(
        @Query('page', ParseIntPipe) page: number,
        @Query('limit', ParseIntPipe) limit: number,
        @User() user: Observable<UserDto>,
    ) {
        return this.orderService.list({ page, limit }, user);
    }
}
