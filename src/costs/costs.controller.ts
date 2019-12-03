import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CostsService } from './costs.service';
import { Cost, CostCategory } from './cost.model';
import { CreateCostDto } from './dto/create-cost.dto';
import { EditCostDto } from './dto/edit-cost.dto';

@Controller('costs')
export class CostsController {
  constructor(private costsService: CostsService) {}

  @Get()
  getAllCosts(): Cost[] {
    return this.costsService.getAllCosts();
  }

  @Post()
  @UsePipes(ValidationPipe)
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
    @Body() editCostDto: EditCostDto,
  ): Cost {
    return this.costsService.editCostById(id, editCostDto);
  }

  @Delete('/:id')
  deleteCostById(@Param('id') id: string): void {
    return this.costsService.deleteCostById(id);
  }
}
