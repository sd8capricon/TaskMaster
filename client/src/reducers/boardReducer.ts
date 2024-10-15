// utils
import { resetOrder, sortTaskAscending } from "../utils/taskUtils";

interface stateInterface {
    name: string,
    tasks: TaskLayout,
    updateTasks: Task[]
}

const taskReducer = (state: stateInterface, action: TaskAction): stateInterface => {
    switch (action.type) {
        case "SET_BOARD": {

            const board = action.payload

            const statuses = Array.from(new Set(board.tasks.map(task => task.status)));
            const sortedTasks: TaskLayout = {}

            for (let status of statuses) {
                // create status key if it doesn't exist
                if (!sortedTasks[status]) {
                    sortedTasks[status] = [];
                }
                sortedTasks[status].push(
                    ...board.tasks.filter(t => t.status === status)
                        .sort(sortTaskAscending)
                )
            }

            return { name: board.name, tasks: sortedTasks, updateTasks: [] }
        }

        case 'ADD_STATUS': {
            const { status } = action.payload;

            const newTasks = { ...state.tasks }

            if (!newTasks[status]) {
                return {
                    name: state.name,
                    tasks: {
                        ...newTasks,
                        [status]: []
                    },
                    updateTasks: []
                };
            }

            return { name: state.name, tasks: newTasks, updateTasks: [] };
        }

        case "ADD_TASK": {
            const { task } = action.payload;

            // Add the new task to the specified status and reset the order
            const newTasks = {
                ...state.tasks,
                [task.status]: [...state.tasks[task.status], { ...task }] // Push task and set its order
            };

            return { name: state.name, tasks: newTasks, updateTasks: [task] };
        }


        case "SET_TASKS": {
            return { name: state.name, tasks: action.payload, updateTasks: [] }
        }

        case "DROP_TASK": {

            const { draggedTask, droppedTask, newStatus } = action.payload;

            let newTasks = structuredClone(state.tasks);


            // Capture tasks before making any changes for comparison
            const oldStatusTasksBefore = [...newTasks[draggedTask.status]];
            const newStatusTasksBefore = [...newTasks[newStatus]];

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

            // Tasks after changes for comparison
            const oldStatusTasksAfter = [...newTasks[oldStatus]];
            const newStatusTasksAfter = [...newTasks[newStatus]];

            // Identify tasks with changed orders
            const updatedOldStatusTasks = oldStatusTasksAfter.filter(
                (task, index) => task.id !== oldStatusTasksBefore[index]?.id || task.order !== oldStatusTasksBefore[index].order
            );

            const updatedNewStatusTasks = newStatusTasksAfter.filter(
                (task, index) => task.id !== newStatusTasksBefore[index]?.id || task.order !== newStatusTasksBefore[index].order
            );

            // Update only the tasks that have changed
            const tasksToUpdate = [...updatedOldStatusTasks, ...updatedNewStatusTasks];


            return { name: state.name, tasks: newTasks, updateTasks: tasksToUpdate };
        }


        case "REMOVE_TASK": {
            const { taskId, status } = action.payload;


            // Filter out the task to be removed and reset the order
            let newTasks = { ...state.tasks };
            const originalTasks = newTasks[status];
            const removedTask = newTasks[status].find(t => t.id === taskId)
            newTasks[status] = newTasks[status]
                .filter(t => t.id !== taskId)
                .map(resetOrder);

            const tasksWithChangedOrder = newTasks[status].filter((task, index) => {
                return task.order !== originalTasks[index].order;
            });

            const tasksToUpdate = [removedTask!, ...tasksWithChangedOrder]

            return { name: state.name, tasks: newTasks, updateTasks: tasksToUpdate };
        }

        default:
            return state;
    }
}

export default taskReducer