import { Router, Request, Response, NextFunction } from "express";
import AppDataSource from "../db";
import Board from "../models/board";

const router = Router()
const boardRepository = AppDataSource.getRepository(Board)

router.get("/", async (req: Request, res: Response) => {
    try {
        const boards = await boardRepository.find()
        res.json(boards)
    } catch (error) {
        res.status(200).json({ error })
    }
})
router.route("/:id").all((req: Request, res: Response, next: NextFunction) => {
    const boardId = Number(req.params.id)
    if (Number.isNaN(boardId))
        return res.status(400).json({ error: "Request parameter should be a number" })
    req.body.boardId = boardId
    next()
}).get(async (req: Request, res: Response) => {
    // get board by id
    const boardId = req.body.boardId
    try {
        const board = await boardRepository.findOne({ relations: { tasks: true }, where: { id: boardId } })
        // if null then board doesnt exist
        res.status(200).json(board)
    } catch (error) {
        res.status(500).json({ error })
    }
}).delete(async (req: Request, res: Response) => {
    const boardId = req.body.boardId
    try {
        const delRes = await boardRepository.delete({ id: boardId })
        res.status(200).json({ result: delRes })
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.post("/", async (req: Request, res: Response) => {
    const body = req.body
    const board = new Board()
    board.name = body.name
    try {
        const boardRes = await boardRepository.save(board)
        res.status(200).json(boardRes)
    }
    catch (error) {
        res.status(500).json({ error })
    }
})

export default router