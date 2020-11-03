import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Users } from './users/users.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'interaktiv',
            port: 5432,
            username: 'postgres',
            password: 'secret',
            database: 'my_database',
            entities: [Users],
            synchronize: false
        }),
        AuthModule,
        UsersModule
    ]
})
export class AppModule {}
