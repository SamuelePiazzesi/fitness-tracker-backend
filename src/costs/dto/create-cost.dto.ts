import { CostCategory } from '../cost.model';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  value: number;

  @IsNotEmpty()
  category: CostCategory;
}
