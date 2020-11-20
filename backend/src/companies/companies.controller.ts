import {
    Controller,
    Delete,
    Get,
    Param,
    Query,
    UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Roles } from '@auth/decorators/roles.decorator';
import { CompaniesService } from '@companies/companies.service';

@Controller('companies')
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) {}
}
