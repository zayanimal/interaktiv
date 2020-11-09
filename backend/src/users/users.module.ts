
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from './entities/users.entity';
import { Roles } from './entities/roles.entity';
import { Permissions } from './entities/permissions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Roles, Permissions])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
