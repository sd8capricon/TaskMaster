import { Router } from "express"
import { checkIdParamNaN } from "../middlewares";
import { getAllBoards, createBoard, updateBoardName, getBoardWithTasks, deleteBoard } from "../controllers/boardController"

const router = Router()

router.route("/")
    .get(getAllBoards)
    .post(createBoard)
    .put(updateBoardName)

router.route("/:id")
    .all(checkIdParamNaN)
    .get(getBoardWithTasks)
    .delete(deleteBoard)

export default router