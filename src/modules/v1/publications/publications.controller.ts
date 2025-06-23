// src/publications/publications.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  ParseEnumPipe,
} from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { Publication } from './entities/publication.entity';
import { CreatePublicationDto } from './dtos/create-publication.dto';
import { CourseCategory } from '../courses/enum/course-category.enum';

@Controller('api/v1/publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  // POST /api/v1/publications
  @Post()
  create(@Body() dto: CreatePublicationDto): Promise<Publication> {
    return this.publicationsService.create(dto);
  }

  // GET /api/v1/publications
  @Get()
  findAll(
    @Query('category', new ParseEnumPipe(CourseCategory, { optional: true }))
    category?: CourseCategory,
  ) {
    if (category) {
      return this.publicationsService.findByCategory(category);
    }
    return this.publicationsService.findAll();
  }


  // GET /api/v1/publications/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Publication> {
    return this.publicationsService.findOne(id);
  }

  // @Get('category/:category')
  // getByCategory(@Param('category') category: CourseCategory) {
  //   return this.publicationsService.findByCategory(category);
  // }


  // DELETE /api/v1/publications/:id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.publicationsService.remove(id);
  }
}
