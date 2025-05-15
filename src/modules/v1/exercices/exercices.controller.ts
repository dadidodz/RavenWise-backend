import { Controller, Post, Body } from '@nestjs/common';
import { ExercicesService } from './exercices.service';
import { CreateExerciceDto } from './dtos/create-exercice.dto';

@Controller('exercices')
export class ExercicesController {
  constructor(private readonly exercicesService: ExercicesService) {}

  @Post()
  async create(@Body() createExerciceDto: CreateExerciceDto) {
    return this.exercicesService.create(createExerciceDto);
  }
}
