import express from 'express'
import morgan from 'morgan'
import cors from "cors"
// Database Conection Object
import AppDataSource from './db';
// Routes
import boardRoutes from "./routes/boardRoutes"
import taskRoutes from "./routes/taskRoutes"

const app = express();
app.use(cors({
    origin: ['http://localhost:5173'],
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'));

AppDataSource.initialize().then(async () => {
    // Only for sqlite
    await AppDataSource.query('PRAGMA foreign_keys = ON');

    app.use("/board", boardRoutes)
    app.use("/task", taskRoutes)

    app.listen(3000, () => {
        console.log('App listening on port 3000!');
    });
}).catch((err) => {
    console.log(err);
})

