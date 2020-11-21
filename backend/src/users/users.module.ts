
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from '@users/users.controller';
import { UsersService } from '@users/users.service';
import { Users } from '@users/entities/users.entity';
import { Roles } from '@users/entities/roles.entity';
import { Permissions } from '@users/entities/permissions.entity';
import { Contacts } from '@users/entities/contacts.entity';
import { Companies } from '@companies/entities/companies.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Users,
    Roles,
    Permissions,
    Contacts,
    Companies
  ])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
