import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarginService } from '@good/margin/margin.service';
import { Margin } from '@good/margin/entities/margin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Margin
    ])
  ],
  providers: [MarginService],
  exports: [MarginService]
})
export class MarginModule {}
