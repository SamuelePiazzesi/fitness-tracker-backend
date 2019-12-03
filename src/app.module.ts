import { Module } from '@nestjs/common';
import { CostsModule } from './costs/costs.module';


@Module({
  imports: [CostsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
