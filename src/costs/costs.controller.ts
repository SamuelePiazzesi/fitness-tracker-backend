import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query
} from '@nestjs/common';
import * as _ from 'lodash';
import { CostsService } from './costs.service';
import { Cost, CostCategory } from './cost.model';
import { CreateCostDto } from './dto/create-cost.dto';
import { EditCostDto } from './dto/edit-cost.dto';
import { GetCostsFilterDto } from './dto/get-costs-filter.dto';

@Controller('costs')
export class CostsController {
  constructor(private costsService: CostsService) {}

  @Get()
  getAllCosts(@Query() getCostsFilterDto: GetCostsFilterDto): Cost[] {
    if (_.keys(getCostsFilterDto).length) {
      return this.costsService.getCostsWithFilter(getCostsFilterDto);
    } else {
      return this.costsService.getAllCosts();
    }
  }

  @Post()
  createCost(@Body() createCostDto: CreateCostDto): Cost {
    return this.costsService.createCost(createCostDto);
  }

  @Get('/:id')
  getCostById(@Param('id') id: string): Cost {
    return this.costsService.getCostById(id);
  }

  @Patch('/:id')
  editCostById(
    @Param('id') id: string,
    @Body() editCostDto: EditCostDto
  ): Cost {
    return this.costsService.editCostById(id, editCostDto);
  }

  @Delete('/:id')
  deleteCostById(@Param('id') id: string): void {
    return this.costsService.deleteCostById(id);
  }
}
