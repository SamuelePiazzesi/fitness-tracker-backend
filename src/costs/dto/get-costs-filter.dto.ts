import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { CostCategory } from '../cost.model';
import * as _ from 'lodash';

export class GetCostsFilterDto {
  readonly categories = _(CostCategory)
    .keys()
    .map((c) => c.toUpperCase())
    .value();
  @IsOptional()
  @IsIn(this.categories)
  category: CostCategory;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
