import { Request, Response, NextFunction } from "express"

export const checkIdParamNaN = (req: Request, res: Response, next: NextFunction) => {
    const boardId = Number(req.params.id)
    if (Number.isNaN(boardId))
        return res.status(400).json({ error: "Request parameter should be a number" })
    req.body.searchId = boardId
    next()
}