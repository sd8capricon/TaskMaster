import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import Board from "./board";
import AppDataSource from "../db";

@Entity()
class Task {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ default: 0 })
    order: number

    @Column()
    status: string

    @ManyToOne(() => Board, (board) => board.tasks, { onDelete: "CASCADE" })
    board: Board
}

export default Task