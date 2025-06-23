import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publication } from './entities/publication.entity';
import { User } from '../users/entities/user.entity';
import { CreatePublicationDto } from './dtos/create-publication.dto';
import { CourseCategory } from '../courses/enum/course-category.enum';

@Injectable()
export class PublicationsService {
    constructor(
        @InjectRepository(Publication)
        private readonly publicationRepository: Repository<Publication>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(createPublicationDto: CreatePublicationDto): Promise<Publication> {
        const { authorClerkId, title, description, category } = createPublicationDto;

        const user = await this.userRepository.findOneBy({ clerkId: authorClerkId });

        if (!user) {
            throw new NotFoundException(`User with clerkId '${authorClerkId}' not found`);
        }

        const publication = this.publicationRepository.create({
            title,
            description,
            author: user,
            category
        });

        return await this.publicationRepository.save(publication);
    }

    async findAll(): Promise<Publication[]> {
        return await this.publicationRepository.find({
            relations: ['author'],
            order: { id: 'DESC' },
        });
    }

    async findOne(id: number): Promise<Publication> {
        const publication = await this.publicationRepository.findOne({
            where: { id },
            relations: ['author'],
        });

        if (!publication) {
            throw new NotFoundException(`Publication with id '${id}' not found`);
        }

        return publication;
    }

    async findByCategory(category: CourseCategory): Promise<Publication[]> {
        return this.publicationRepository.find({
            where: { category },
            relations: ['author'],
        });
    }



    async remove(id: number): Promise<void> {
        const result = await this.publicationRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Publication with id '${id}' not found`);
        }
    }
}
