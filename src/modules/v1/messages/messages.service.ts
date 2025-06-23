import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dtos/create-message.dto';
import { User } from '../users/entities/user.entity';
import { Publication } from '../publications/entities/publication.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Publication)
    private readonly publicationRepository: Repository<Publication>,
  ) {}

  async findAll(): Promise<Message[]> {
    return this.messageRepository.find({
      relations: ['author', 'publication'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Message> {
    const message = await this.messageRepository.findOne({
      where: { id },
      relations: ['author', 'publication'],
    });
    if (!message) {
      throw new NotFoundException(`Message with id ${id} not found`);
    }
    return message;
  }

  async findByPublicationId(publicationId: number): Promise<Message[]> {
    return this.messageRepository.find({
      where: { publication: { id: publicationId } },
      relations: ['author', 'publication'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByUser(authorClerkId: string): Promise<Message[]> {
  return this.messageRepository.find({
    where: {
      author: { clerkId: authorClerkId }
    },
    relations: ['author', 'publication'], // selon ce que tu veux inclure
  });
}


  async create(dto: CreateMessageDto): Promise<Message> {
    const author = await this.userRepository.findOneBy({ clerkId: dto.authorClerkId });
    if (!author) {
      throw new NotFoundException(`User with clerkId ${dto.authorClerkId} not found`);
    }

    const publication = await this.publicationRepository.findOneBy({ id: dto.publicationId });
    if (!publication) {
      throw new NotFoundException(`Publication with id ${dto.publicationId} not found`);
    }

    const message = this.messageRepository.create({
      text: dto.text,
      author,
      publication,
    });

    return this.messageRepository.save(message);
  }

  async remove(id: number): Promise<void> {
    const message = await this.messageRepository.findOneBy({ id });
    if (!message) {
      throw new NotFoundException(`Message with id ${id} not found`);
    }
    await this.messageRepository.remove(message);
  }
}
