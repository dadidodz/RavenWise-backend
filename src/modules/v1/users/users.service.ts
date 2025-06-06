import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { Course } from '../courses/entities/course.entity';
import { AddCourseToUserDto } from '../courses/dtos/add-course-to-user.dto';
import { AddCourseResponseDto } from '../courses/dtos/add-course-response.dto'; 
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Course)  // Injection du repository de Course
    private readonly coursesRepository: Repository<Course> 
  ) {}

  // Méthode pour créer un utilisateur
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Vérification si l'id est déjà utilisé
    const existingUser = await this.userRepository.findOne({ where: { id: createUserDto.id } });
    if (existingUser) {
      throw new HttpException('Cet uid est déjà utilisé', HttpStatus.BAD_REQUEST);
    }

    // Création de l'utilisateur
    const user = this.userRepository.create(createUserDto);

    // Sauvegarde dans la base de données
    const savedUser = await this.userRepository.save(user);

    // Transformation pour exclure le mot de passe
    return plainToInstance(User, savedUser, { excludeExtraneousValues: true });
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // findOne(id: string): Promise<User | null> {
  //   return this.userRepository.findOneBy({ id });
  // }

  async findOne(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }


  async ensureExists(id: string): Promise<void> {
    const exists = await this.userRepository.exists({ where: { id } });

    if (!exists) {
      throw new NotFoundException(`Utilisateur avec l'id ${id} non trouvé.`);
    }

    // Sinon, rien à faire — on retourne un 200 vide.
  }

  async addCourseToUser(userId: string, addCourseDto: AddCourseToUserDto): Promise<AddCourseResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['courses'],
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const course = await this.coursesRepository.findOne({
      where: { id: addCourseDto.courseId },
    });

    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    const response = new AddCourseResponseDto();

    const alreadySubscribed = user.courses.some(c => c.id === course.id);
    if (alreadySubscribed) {
      response.message = 'Vous êtes déjà inscrit à ce cours.';
    } else {
      user.courses.push(course);
      await this.userRepository.save(user);
      response.message = 'Vous avez bien souscrit au cours.';
    }

    // Transforme pour exclure les champs sensibles
    const transformedUser = plainToInstance(User, user, {
      excludeExtraneousValues: true,
    });

    response.user = transformedUser;

    return response;
  }


  async removeCourseFromUser(userId: string, courseId: number): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['courses'],
    });

    if (!user) {
      throw new HttpException('Utilisateur non trouvé', HttpStatus.NOT_FOUND);
    }

    const course = await this.coursesRepository.findOne({
      where: { id: courseId },
    });

    if (!course) {
      throw new HttpException('Cours non trouvé', HttpStatus.NOT_FOUND);
    }

    // Vérifier si l'utilisateur est déjà inscrit au cours
    const courseIndex = user.courses.findIndex((c) => c.id === courseId);
    if (courseIndex === -1) {
      throw new HttpException('L\'utilisateur n\'est pas inscrit à ce cours', HttpStatus.BAD_REQUEST);
    }

    // Retirer le cours de la liste des cours de l'utilisateur
    user.courses.splice(courseIndex, 1);

    // Sauvegarder les changements
    await this.userRepository.save(user);

    // Retourner un message de succès
    return { message: 'Vous vous êtes bien désinscrit du cours' };
  }

  async getUserCourses(userId: string): Promise<Course[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['courses'], // charge les cours associés
    });
  
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
  
    return user.courses;
  }

  async deleteUserById(id: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await this.userRepository.delete(id);

    // Suppression de l'utilisateur
    // await this.userRepository.remove(user);

    // Retourner un message de succès
    return { message: `L'utilisateur avec l'ID ${id} a bien été supprimé.` };
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    Object.assign(user, dto);
    return this.userRepository.save(user);
  }
}
