import { Controller, Post, Body, Get, Param, Patch, ParseIntPipe } from '@nestjs/common';
import { ExercicesService } from './exercices.service';
import { CreateExerciceDto } from './dtos/create-exercice.dto';
import { Exercice } from './entities/exercice.entity';
import { UpdateExerciceDto } from './dtos/update-exercice.dto';

@Controller('api/v1/exercices')
export class ExercicesController {
  constructor(private readonly exercicesService: ExercicesService) {}

  @Post()
  async create(@Body() createExerciceDto: CreateExerciceDto) {
    return this.exercicesService.create(createExerciceDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Exercice | null> {
    return this.exercicesService.findOne(+id);
  }

  @Patch(':id')
  updateExercice(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateExerciceDto,
  ) {
    return this.exercicesService.update(id, updateDto);
  }
  
}
