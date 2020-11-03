
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from './entities/users.entity';
import { Roles } from './entities/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Roles])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
