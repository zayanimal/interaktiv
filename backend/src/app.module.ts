import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@auth/auth.module';
import { UsersModule } from '@users/users.module';
import { DictionaryModule } from '@dictionary/dictionary.module';
import { CompanyModule } from 'src/company/company.module';
import { GoodModule } from '@good/good.module';
import { EnduserModule } from '@enduser/enduser.module';
import { OrderModule } from './order/order.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        AuthModule,
        UsersModule,
        DictionaryModule,
        CompanyModule,
        GoodModule,
        EnduserModule,
        OrderModule
    ]
})
export class AppModule {}
