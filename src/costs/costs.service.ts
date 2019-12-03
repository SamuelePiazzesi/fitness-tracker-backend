import { Injectable } from '@nestjs/common';
import { Cost } from './cost.model';
import * as uuid from 'uuid/v1';
import { CreateCostDto } from './dto/create-cost.dto';
import * as _ from 'lodash';
import { EditCostDto } from './dto/edit-cost.dto';

@Injectable()
export class CostsService {
  private costs: Cost[] = [];

  getAllCosts(): Cost[] {
    return this.costs;
  }

  createCost(createCostDto: CreateCostDto): Cost {
    const { title, description, value, category } = createCostDto;
    const cost: Cost = {
      id: uuid(),
      title,
      description,
      value,
      category,
    };
    this.costs.push(cost);
    return cost;
  }

  getCostById(id: string): Cost {
    return _.find(this.costs, ['id', id]);
  }

  editCostById(id: string, editCostDto: EditCostDto): Cost {
    const { title, description, value, category } = editCostDto;
    const selectedCost = this.getCostById(id);
    selectedCost.title = title;
    selectedCost.description = description;
    selectedCost.value = value;
    selectedCost.category = category;

    return selectedCost;
  }

  deleteCostById(id: string): void {
    this.costs = _.remove(this.costs, (cost: { id: string }) => cost.id === id);
  }
}
