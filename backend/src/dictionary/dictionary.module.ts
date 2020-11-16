import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictionaryAdminController } from '@dictionary/controllers/dictionaryAdmin.controller';
import { DictionaryAdminService } from '@dictionary/services/dictionaryAdmin.service';
import { AdminDictionaries } from '@dictionary/entities/adminDicts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    AdminDictionaries
  ])],
  controllers: [DictionaryAdminController],
  providers: [DictionaryAdminService]
})
export class DictionaryModule {}
