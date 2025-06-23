import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Publication } from '../../publications/entities/publication.entity';

@Entity('messages')
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    text: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.messages, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    author: User;

    @ManyToOne(() => Publication, (publication) => publication.messages, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    publication: Publication;
}
