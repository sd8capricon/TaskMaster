import { Router } from "express"
import { checkBoardIdParamNaN } from "../middlewares/boardMiddleware";
import { getAllBoards, createBoard, updateBoardName, getBoardWithTasks, deleteBoard } from "../controllers/boardController"

const router = Router();

router.route("/")
    .get(getAllBoards)
    .post(createBoard)
    .put(updateBoardName)

router.route("/:id")
    .all(checkBoardIdParamNaN)
    .get(getBoardWithTasks)
    .delete(deleteBoard)

export default router