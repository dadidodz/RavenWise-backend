import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToMany,
    JoinTable,
    PrimaryColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Course } from '../../courses/entities/course.entity';
import { UserRole } from '../enum/user-role.enum';

@Entity('users')
export class User {
    @PrimaryColumn({ unique: true, nullable: false })
    id: string;

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
}
  