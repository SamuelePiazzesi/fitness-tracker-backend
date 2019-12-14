import { Injectable, NotFoundException } from '@nestjs/common';
import { Cost } from './cost.model';
import * as uuid from 'uuid/v1';
import { CreateCostDto } from './dto/create-cost.dto';
import * as _ from 'lodash';
import { EditCostDto } from './dto/edit-cost.dto';
import { GetCostsFilterDto } from './dto/get-costs-filter.dto';

@Injectable()
export class CostsService {
  private costs: Cost[] = [];

  getAllCosts(): Cost[] {
    return this.costs;
  }

  getCostsWithFilter(getCostsFilterDto: GetCostsFilterDto): Cost[] {
    const { category, search } = getCostsFilterDto;
    let costs = this.getAllCosts();

    if (category) {
      costs = _.filter(costs, (c) => c.category === category.toUpperCase());
    }
    if (search) {
      costs = _.filter(
        costs,
        (c) => c.title.includes(search) || c.description.includes(search)
      );
    }

    return costs;
  }

  createCost(createCostDto: CreateCostDto): Cost {
    const { title, description, value, category } = createCostDto;
    const cost: Cost = {
      id: uuid(),
      title,
      description,
      value,
      category
    };
    this.costs.push(cost);
    return cost;
  }

  getCostById(id: string): Cost {
    const cost = _.find(this.costs, ['id', id]);
    if (!cost) {
      throw new NotFoundException();
    }
    return cost;
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
    const cost = this.getCostById(id);
    this.costs = _.remove(this.costs, (c) => c.id === cost.id);
  }
}
