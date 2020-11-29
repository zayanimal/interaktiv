import { Controller } from '@nestjs/common';
import { GoodService } from '@good/good.service';

@Controller('good')
export class GoodController {
    constructor(private goodService: GoodService) {}
}
