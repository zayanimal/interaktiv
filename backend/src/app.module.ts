import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'interaktiv',
            port: 5432,
            username: 'postgres',
            password: 'secret',
            database: 'interaktiv',
            entities: [User],
            synchronize: true
        }),
        AuthModule,
        UsersModule
    ]
})
export class AppModule {}
