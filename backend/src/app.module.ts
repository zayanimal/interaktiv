import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DictionaryModule } from './dictionary/dictionary.module';
import { CompaniesModule } from './companies/companies.module';
import { GoodModule } from './good/good.module';
import { EnduserModule } from './enduser/enduser.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        AuthModule,
        UsersModule,
        DictionaryModule,
        CompaniesModule,
        GoodModule,
        EnduserModule
    ]
})
export class AppModule {}
