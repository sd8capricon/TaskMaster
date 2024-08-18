import { Router } from "express";
import { checkIdParamNaN } from "../middlewares";
import { createNewTask, deleteTaskById, getTaskByBoardId, getTaskById, updateTask } from "../controllers/taskController";

const router = Router()

router.route("/")
    .post(createNewTask)
    .put(updateTask)

router.route("/:id")
    .all(checkIdParamNaN)
    .get(getTaskById)
    .delete(deleteTaskById)

router.route("/board/:id")
    .all(checkIdParamNaN)
    .get(getTaskByBoardId)

export default router