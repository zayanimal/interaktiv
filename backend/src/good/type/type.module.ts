import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeService } from '@good/type/type.service';
import { Type } from '@good/type/entities/type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Type
    ])
  ],
  providers: [TypeService],
  exports: [TypeService]
})
export class TypeModule {}
