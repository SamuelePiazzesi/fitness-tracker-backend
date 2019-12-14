import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException
} from '@nestjs/common';
import * as _ from 'lodash';
import { CostCategory } from '../cost.model';

export default class CostCategoryValidationPipe implements PipeTransform {
  readonly validCategories = _.keys(CostCategory);
  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase();

    if (!this.isValid) {
      throw new BadRequestException('Category not valid');
    }

    return value;
  }

  private isValid(category: any) {
    const idx = this.validCategories.indexOf(category);

    return idx !== -1;
  }
}
