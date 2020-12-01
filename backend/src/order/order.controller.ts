import {
    Controller,
    Post,
    UseGuards,
    Body,
    Get,
    Param,
    Put,
    ValidationPipe
} from '@nestjs/common';
import { OrderService } from '@order/order.service';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Roles } from '@auth/decorators/roles.decorator';
import { CreateOrderDto } from '@order/dto/order.dto';

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Put()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    create(@Body(ValidationPipe) order: CreateOrderDto) {
        return this.orderService.create(order);
    }
}
