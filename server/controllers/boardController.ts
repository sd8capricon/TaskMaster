import { Request, Response } from "express";
import AppDataSource from "../db";
import Board from "../models/board";

const boardRepository = AppDataSource.getRepository(Board)

export const getAllBoards = async (req: Request, res: Response) => {
    try {
        const boards = await boardRepository.find()
        res.json(boards)
    } catch (error) {
        res.status(200).json({ error })
    }
}

export const getBoardWithTasks = async (req: Request, res: Response) => {
    // get board by id
    const boardId = req.body.searchId
    try {
        const board = await boardRepository.findOne({ relations: { tasks: true }, where: { id: boardId } })
        // if null then board doesnt exist
        if (board !== null) {
            const tasksWithBoardId = board.tasks.map(task => ({
                id: task.id,
                name: task.name,
                order: task.order,
                status: task.status,
                board: board.id, // Include board ID
            }));
            res.status(200).json(tasksWithBoardId)
        }
        res.status(200).json(board)
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const deleteBoard = async (req: Request, res: Response) => {
    const boardId = req.body.searchId
    try {
        const delRes = await boardRepository.delete({ id: boardId })
        res.status(200).json({ result: delRes })
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const createBoard = async (req: Request, res: Response) => {
    const body = req.body.board
    const board = new Board()
    board.name = body.name
    try {
        const boardRes = await boardRepository.save(board)
        res.status(200).json(boardRes)
    }
    catch (error) {
        res.status(500).json({ error })
    }
}

export const updateBoardName = async (req: Request, res: Response) => {
    const body = req.body.board
    const boardId = body.id
    const newBoadName = body.name
    try {
        const boardRes = await boardRepository.update({ id: boardId }, { name: newBoadName })
        res.status(200).json(boardRes)
    } catch (error) {
        res.status(500).json({ error })
    }
}