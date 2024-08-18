import { DataSource } from "typeorm";
import Board from "./models/board";
import Task from "./models/task";

const SQLiteDataSource = new DataSource({
    type: "sqlite",
    database: "db.sqlite",
    synchronize: true,
    logging: true,
    entities: [Board, Task],
    migrations: [],
    subscribers: []
})

export default SQLiteDataSource