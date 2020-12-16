import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@auth/auth.module';
import { UsersController } from '@users/users.controller';
import { UsersService } from '@users/services/users.service';
import { ContactsService } from '@users/services/contacts.service';
import { UsersRepository } from '@users/repositories/users.repository';
import { ContactsRepository } from '@users/repositories/contacts.repository';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([
      UsersRepository,
      ContactsRepository
    ])
  ],
  providers: [UsersService, ContactsService],
  controllers: [UsersController],
  exports: [UsersService, ContactsService]
})
export class UsersModule {}
