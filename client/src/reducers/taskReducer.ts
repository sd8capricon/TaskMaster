// utils
import { resetOrder } from "../utils/taskUtils";

const taskReducer = (state: TaskLayout, action: TaskAction): TaskLayout => {
    switch (action.type) {
        case "ADD_TASK": {
            const { task } = action.payload;

            // Add the new task to the specified status and reset the order
            const newTasks = {
                ...state,
                [task.status]: [...state[task.status], { ...task }] // Push task and set its order
            };

            return newTasks;
        }

        case 'ADD_STATUS': {
            const { status } = action.payload;

            const newTasks = { ...state }

            if (!newTasks[status]) {
                return {
                    ...newTasks,
                    [status]: []
                };
            }

            return newTasks;
        }


        case "SET_TASKS": {
            return action.payload
        }

        case "DROP_TASK": {

            console.log("run");

            const { draggedTask, droppedTask, newStatus } = action.payload;

            let newTasks = structuredClone(state);

            // Remove the dragged task from the old status list and reset order
            const oldStatus = draggedTask.status;
            newTasks[oldStatus] = newTasks[oldStatus]
                .filter(t => t.id !== draggedTask.id)
                .map(resetOrder);

            // Calculate where to insert the dragged task in the new status list
            const droppedTaskIndex = droppedTask
                ? newTasks[newStatus].findIndex(t => t.id === droppedTask.id)
                : newTasks[newStatus].length;  // Insert at the end if droppedTask is null

            // Insert the dragged task into the new status list and reset order
            newTasks[newStatus].splice(droppedTaskIndex + 1, 0, { ...draggedTask, status: newStatus });
            newTasks[newStatus] = newTasks[newStatus].map(resetOrder);

            return newTasks;
        }


        case "REMOVE_TASK": {
            const { taskId, status } = action.payload;

            // Filter out the task to be removed and reset the order
            let newTasks = { ...state };
            newTasks[status] = newTasks[status]
                .filter(t => t.id !== taskId)
                .map(resetOrder);

            return newTasks;
        }

        default:
            return state;
    }
}

export default taskReducer