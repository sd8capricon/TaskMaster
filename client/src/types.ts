type Status = 'backlog' | 'todo' | 'in_progress' | 'completed' | string

type Task = {
    id: number,
    name: string,
    order: number,
    status: Status
}

interface TaskLayout {
    [key: string]: Task[],
    backlog: Task[],
    todo: Task[]
    in_progress: Task[]
    completed: Task[]
}

type Board = {
    id: number,
    name: string,
    tasks: Task[]
}

type TaskAction =
    | { type: 'DROP_TASK', payload: { draggedTask: Task, droppedTask: Task | null, newStatus: Status } }
    | { type: 'REMOVE_TASK', payload: { taskId: number, status: Status } }
    | { type: 'SET_TASKS', payload: TaskLayout }
    | { type: 'ADD_STATUS', payload: { status: Status } }
    | { type: 'ADD_TASK', payload: { task: Task } }
