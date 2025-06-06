import { Controller, Post, Body, Get, Param, Delete, Patch, UseGuards, Req, HttpCode, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import { AddCourseToUserDto } from '../courses/dtos/add-course-to-user.dto';
import { RemoveCourseToUserDto } from '../courses/dtos/remove-course-to-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ClerkAuthGuard } from 'src/auth/clerk-auth.guard';


@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // POST

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Post(':userId/courses')
  async addCourseToUser(
    @Param('userId') userId: string,
    @Body() addCourseDto: AddCourseToUserDto,
  ) {
    return this.usersService.addCourseToUser(userId, addCourseDto);
  }

  // GET

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  @Get(':id/exists')
  async checkUserExists(@Param('id') id: string): Promise<void> {
    await this.usersService.ensureExists(id);
  }

   @Get(':userId/courses')
  getUserCourses(@Param('userId') userId: string) {
    return this.usersService.getUserCourses(userId);
  }

  @UseGuards(ClerkAuthGuard)
  @Get('me')
  async getMe(@Req() req) {
    const clerkUser = req.clerkUser;
    if (!clerkUser) {
      throw new UnauthorizedException();
    }

    // Vérifier dans ta BDD perso si l'utilisateur existe
    const user = await this.usersService.findOne(clerkUser.id);
    if (!user) {
      throw new NotFoundException(`Utilisateur Clerk ${clerkUser.id} non trouvé`);
      // OU tu peux faire : await this.usersService.createFromClerkUser(clerkUser);
      // puis retourner ce nouvel utilisateur
    }

    return user;
  }

  // PATCH

  @Patch(':id')
    updateUSer(
      @Param('id') id: string,
      @Body() updateDto: UpdateUserDto,
    ) {
      return this.usersService.update(id, updateDto);
    }

  // DELETE

  @Delete(':userId/courses')
  async removeCourseFromUser(
    @Param('userId') userId: string,
    @Body() removeCourseDto: RemoveCourseToUserDto, // Ici on attend que le body contienne le courseId
  ) {
    return this.usersService.removeCourseFromUser(userId, removeCourseDto.courseId); // Appel du service pour supprimer le cours
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    const result = await this.usersService.deleteUserById(id);

    // const result = await this.usersService.remove(id);
    return result; 
  }
  
}
