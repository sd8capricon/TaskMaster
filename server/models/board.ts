import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Task from "./task";

@Entity()
class Board {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Task, (task) => task.board, {
        // nullable: true,
        cascade: true,
        onDelete: "CASCADE",
        // eager: true //If set to true, the related Board entity will always be loaded with the Task entity automatically without needing to use a join query.
    })
    tasks: Task[]
}

export default Board