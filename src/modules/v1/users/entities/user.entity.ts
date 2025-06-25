import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToMany,
    JoinTable,
    PrimaryColumn,
    OneToMany,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Course } from '../../courses/entities/course.entity';
import { UserRole } from '../enum/user-role.enum';
import { Publication } from '../../publications/entities/publication.entity';
import { Message } from '../../messages/entities/message.entity';

@Entity('users')
export class User {
    @PrimaryColumn({ unique: true, nullable: false })
    clerkId: string;

    @Column({ type: 'text', nullable: true })
    firstName: string;

    @Column({ type: 'text', nullable: true })
    lastName: string;

    @Column({ type: 'text', nullable: false })
    email: string;

    @Column({ type: 'text', nullable: true })
    imageUrl: string;

    @Column({
        type: 'text',
        default: UserRole.FREE,
    })
    role: UserRole;

    @CreateDateColumn()
    created_at: Date;

    @Column({ type: 'int', default: 0 })
    hours_spent: number;

    @ManyToMany(() => Course, (course) => course.users, {
        onDelete: 'CASCADE',
    })
    courses: Course[];

    @OneToMany(() => Publication, (publication) => publication.author)
    publications: Publication[];

    @OneToMany(() => Message, (message) => message.author)
    messages: Message[];

}
  