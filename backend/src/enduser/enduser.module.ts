import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnduserService } from '@enduser/enduser.service';
import { Enduser } from '@enduser/entities/enduser.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Enduser
    ])
  ],
  providers: [EnduserService],
  exports: [EnduserService]
})
export class EnduserModule {}
