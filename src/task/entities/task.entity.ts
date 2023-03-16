import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()

export class Task {
    @PrimaryGeneratedColumn()
    id:number
    
    @Column()
    taskDescription: string;

    @Column()
    createDate: number;
    
    @Column()
    status: boolean;

    @ManyToOne(()=> Task, (task) =>task.user)
    tasks: Task[];
    user: any;
    







}