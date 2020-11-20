import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DictionaryModule } from './dictionary/dictionary.module';
import { CompaniesModule } from './companies/companies.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        AuthModule,
        UsersModule,
        DictionaryModule,
        CompaniesModule
    ]
})
export class AppModule {}