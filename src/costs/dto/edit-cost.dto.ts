import { CostCategory } from '../cost.model';

export class EditCostDto {
  title: string;
  description: string;
  value: number;
  category: CostCategory;
}
