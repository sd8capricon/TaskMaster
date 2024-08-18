import SQLiteDataSource from "./db";
import Board from "./models/board";
import Task from "./models/task";

const taskRepository = SQLiteDataSource.getRepository(Task)
const boardRepository = SQLiteDataSource.getRepository(Board)

SQLiteDataSource.initialize()
    .then(async () => {
        // const board = new Board()
        // board.name = "Yello"
        // await boardRepository.save(board)
        let board = await boardRepository.findOneBy({ id: 2 })

        // const t1 = new Task()
        // t1.name = "Get eggs"
        // t1.status = "pending"
        // t1.board = board!
        // await taskRepository.save(t1)

        // const t2 = new Task()
        // t2.name = "run"
        // t2.status = "pending"
        // t2.board = board!
        // await taskRepository.save(t2)

        console.log(board);


    })