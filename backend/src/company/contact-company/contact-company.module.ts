import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactCompanyService } from '@company/contact-company/contact-company.service';
import { ContactCompany } from '@company/contact-company/entities/contact-company.entity'

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ContactCompany
        ])
    ],
    providers: [ContactCompanyService],
    exports: [ContactCompanyService]
})
export class ContactCompanyModule {}
