import { Request, Response } from "express"
import AppDataSource from "../db";
import Task from "../models/task";
import Board from "../models/board";

const taskRepository = AppDataSource.getRepository(Task)

export const createNewTask = async (req: Request, res: Response) => {
    const reqTask = req.body.task
    const task = new Task()
    task.name = reqTask.name
    task.order = reqTask.order
    task.status = reqTask.status
    task.board = { id: Number(reqTask.board) } as Board
    try {
        const taskRes = await taskRepository.save(task)
        res.status(200).json(taskRes)
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const updateTask = async (req: Request, res: Response) => {
    const task = req.body.task
    try {
        const taskRes = await taskRepository.update({ id: task.id }, {
            name: task.name,
            order: task.order,
            status: task.status
        })
        res.status(200).json(taskRes)
    } catch (error) {
        res.status(400).json({ error })
    }
}

export const upsertTask = async (req: Request, res: Response) => {
    const tasks = req.body.tasks
    try {
        const taskRes = await taskRepository.upsert([...tasks], ["id"])
        res.status(200).json(taskRes)

    } catch (error) {
        res.status(400).json({ error })
    }
}

export const getTaskById = async (req: Request, res: Response) => {
    const taskId = req.body.searchId
    try {
        const taskRes = await taskRepository.findOneBy({ id: taskId })
        // null then task doesnt exist
        res.status(200).json(taskRes)
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const deleteTaskById = async (req: Request, res: Response) => {
    const taskId = req.body.searchId
    try {
        const taskRes = await taskRepository.delete({ id: taskId })
        res.status(200).json(taskRes)
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const getTaskByBoardId = async (req: Request, res: Response) => {
    const boardId = req.body.searchId
    try {
        const tasks = await taskRepository.find({ where: { board: { id: boardId } } })
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const updateAndDelete = async (req: Request, res: Response) => {
    const updateTasks = req.body.updateTasks
    const deleteTasks = req.body.deleteTasks

    try {
        const deleteTaskResponse = await taskRepository.delete(deleteTasks[0])

        if (updateTasks.length > 0) {
            const updateResponse = await taskRepository.upsert(updateTasks, ["id"])
            res.status(200).json({ delete: deleteTaskResponse, update: updateResponse })
        }
        else {
            res.status(200).json({ update: deleteTaskResponse })
        }
    } catch (error) {
        res.status(500).json({ error })
    }
}