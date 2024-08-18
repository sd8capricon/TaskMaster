import express, { Request, Response } from 'express';
import morgan from 'morgan'
import AppDataSource from './db';
import boardRoutes from "./routes/boardRoutes"

const app = express();
app.use(express.json())
app.use(morgan('dev'));

AppDataSource.initialize().then(async () => {
    // Only for sqlite
    await AppDataSource.query('PRAGMA foreign_keys = ON');

    app.use("/board", boardRoutes)

    app.listen(3000, () => {
        console.log('App listening on port 3000!');
    });
}).catch((err) => {
    console.log(err);
})

