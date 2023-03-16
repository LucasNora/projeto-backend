import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm" 
import { Task } from "src/task/entities/task.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;
    
    @Column()
    lastName: string;

    @Column()
    email: string;
    
    @Column()
    brithday: number;
    
    @Column()
    profilePictureUrl: string;

    @OneToMany(() => Task, (task) => task.user)
    task: Task[];



}