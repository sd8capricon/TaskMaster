type Status = 'backlog' | 'todo' | 'in_progess' | 'completed'

type Task = {
    id: number,
    name: string,
    order: number,
    status: Status
}

type Board = {
    id: number,
    name: string,
    tasks: Task[]
}

interface DraggedTask extends Task {
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

type boardAction = {
    type: "addTask" | "changeBoard" | "moveTask" | "removeTask" | "newList",
    payload: {
        draggedTask?: draggedTask,
        newTask?: string,
        currentListTitle?: string
        board?: board
    }
}