type board = {
    title: string,
    lists: {
        title: string,
        tasks: string[]
    }[]
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
    type: "addTask" | "changeBoard" | "moveTask" | "removeTask",
    payload: {
        draggedTask?: draggedTask,
        newTask?: string,
        currentListTitle?: string
        board?: board
    }
}