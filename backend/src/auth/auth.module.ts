import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '@users/users.module';
import { ContactsModule } from '@contacts/contacts.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { Users } from '@users/entities/users.entity';
import { Roles } from '@auth/entities/roles.entity';
import { Permissions } from '@auth/entities/permissions.entity';
import { Contacts } from '@contacts/entities/contacts.entity';

@Module({
    imports: [
        forwardRef(() => UsersModule),
        ContactsModule,
        TypeOrmModule.forFeature([
            Users,
            Roles,
            Permissions,
            Contacts
        ]),
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false
        }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1d' }
        })
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [
        AuthService,
        PassportModule,
        JwtModule
    ]
})
export class AuthModule {}
