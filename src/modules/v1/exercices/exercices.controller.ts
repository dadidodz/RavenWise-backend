import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ExercicesService } from './exercices.service';
import { CreateExerciceDto } from './dtos/create-exercice.dto';
import { Exercice } from './entities/exercice.entity';

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
  
}
