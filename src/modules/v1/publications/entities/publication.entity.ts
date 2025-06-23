import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    ManyToMany,
    JoinTable,
    CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Message } from '../../messages/entities/message.entity';
import { CourseCategory } from '../../courses/enum/course-category.enum';
// import { Message } from '../../messages/entities/message.entity';

@Entity('publications')
export class Publication {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    title: string;

    @Column('text')
    description: string;

    @Column({ type: 'text', nullable: false, enum: CourseCategory})
    category: CourseCategory;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => User, (user) => user.publications, { nullable: false, onDelete: 'CASCADE' })
    author: User;

    @OneToMany(() => Message, (message) => message.publication)
    messages: Message[];

}
