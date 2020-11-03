import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Users } from './users/entities/users.entity';
import { Roles } from './users/entities/roles.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'interaktiv',
            port: 5432,
            username: 'postgres',
            password: 'secret',
            database: 'interaktiv',
            entities: [Users, Roles],
            synchronize: true
        }),
        AuthModule,
        UsersModule
    ]
})
export class AppModule {}
