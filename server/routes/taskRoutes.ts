import { Router } from "express";
import { checkIdParamNaN } from "../middlewares";
import { createNewTask, deleteTaskById, getTaskByBoardId, getTaskById, updateTask, upsertTask, updateAndDelete } from "../controllers/taskController";

const router = Router()

router.route("/")
    .post(createNewTask)
    .patch(upsertTask)

router.route("/update-and-delete")
    .patch(updateAndDelete)

router.route("/:id")
    .all(checkIdParamNaN)
    .get(getTaskById)
    .put(updateTask)
    .delete(deleteTaskById)

router.route("/board/:id")
    .all(checkIdParamNaN)
    .get(getTaskByBoardId)

export default router