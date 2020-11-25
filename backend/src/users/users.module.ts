import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@auth/auth.module';
import { UsersController } from '@users/users.controller';
import { UsersService } from '@users/services/users.service';
import { ContactsService } from '@users/services/contacts.service';
import { Users } from '@users/entities/users.entity';
import { Roles } from '@auth/entities/roles.entity';
import { Permissions } from '@auth/entities/permissions.entity';
import { ContactUser } from '@users/entities/contactUser.entity';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([
      Users,
      Roles,
      Permissions,
      ContactUser
    ])
  ],
  providers: [UsersService, ContactsService],
  controllers: [UsersController],
  exports: [UsersService, ContactsService]
})
export class UsersModule {}
