import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DescriptionService } from '@good/description/description.service';
import { Description } from '@good/description/entities/description.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Description
    ])
  ],
  providers: [DescriptionService],
  exports: [DescriptionService]
})
export class DescriptionModule {}
