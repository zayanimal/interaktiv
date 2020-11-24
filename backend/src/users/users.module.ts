import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from '@users/users.controller';
import { UsersService } from '@users/users.service';
import { ContactsModule } from '@contacts/contacts.module';
import { Users } from '@users/entities/users.entity';
import { Roles } from '@auth/entities/roles.entity';
import { Permissions } from '@auth/entities/permissions.entity';
import { Contacts } from '@contacts/entities/contacts.entity';

@Module({
  imports: [
    ContactsModule,
    TypeOrmModule.forFeature([
      Users,
      Roles,
      Permissions,
      Contacts
    ])
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
