type Status = 'backlog' | 'todo' | 'in_progress' | 'completed' | string

type Task = {
    id: number | null,
    name: string,
    order: number,
    status: Status,
    board: number
}

type TaskLayout = {
    [key: string]: Task[]
}

type Board = {
    id: number,
    name: string,
    tasks: Task[]
}

type BoardState = {
    id: number,
    name: string,
    tasks: TaskLayout,
    updateTasks: Task[] | null,
    deleteTasks: Task[] | null,
}

type BoardAction =
    { type: 'DROP_TASK', payload: { draggedTask: Task, droppedTask: Task | null, newStatus: Status } }
    | { type: 'REMOVE_TASK', payload: { taskId: number, status: Status } }
    | { type: "SET_BOARD", payload: Board }
    | { type: 'SET_TASKS', payload: TaskLayout }
    | { type: 'ADD_STATUS', payload: { status: Status } }
    | { type: 'ADD_TASK', payload: { task: Task } }