import { Observable } from 'rxjs';
import {
    Controller,
    Post,
    UseGuards,
    Body,
    Get,
    Req,
    Param,
    Put,
    ValidationPipe
} from '@nestjs/common';
import { User } from '@shared/decorators/user.decorator';
import { UserDto } from '@users/dto/user.dto';
import { OrderService } from '@order/order.service';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Roles } from '@auth/decorators/roles.decorator';
import { CreateOrderDto } from '@order/dto/create-order.dto';

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Put()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    create(
        @Body(ValidationPipe) order: CreateOrderDto,
        @User() user: Observable<UserDto>
    ) {
        return this.orderService.create(order, user);
    }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    list() {
        return this.orderService.list();
    }
}
