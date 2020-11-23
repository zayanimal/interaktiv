import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactsService } from '@contacts/contacts.service';
import { Contacts } from '@contacts/entities/contacts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contacts])],
  providers: [ContactsService],
  exports: [ContactsService]
})
export class ContactsModule {}
