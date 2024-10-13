type Status = 'backlog' | 'todo' | 'in_progress' | 'completed'

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

type boardList = {
    title: string,
    tasks: string[]
}

type board = {
    title: string,
    lists: boardList[]
}

type draggedTask = {
    task: string,
    list: string,
    dragOverItem: {
        task: string,
        list: string
    }
}

type taskAction =
    | { type: 'DROP_TASK', payload: { draggedTask: Task, droppedTask: Task | null, newStatus: Status } }
    | { type: 'REMOVE_TASK', payload: { taskId: number, status: Status } }
    | { type: 'SET_TASKS', payload: TaskLayout }


type boardAction = {
    type: "addTask" | "changeBoard" | "moveTask" | "removeTask" | "newList",
    payload: {
        draggedTask?: draggedTask,
        newTask?: string,
        currentListTitle?: string
        board?: board
    }
}