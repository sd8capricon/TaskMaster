import { draggedTaskInterface } from "../context/context"
import { boardInterface } from "../App"

export interface actionInterface {
    type: "addTask" | "moveTask" | "removeTask",
    payload: {
        draggedTask?: draggedTaskInterface,
        newTask?: string,
        currentListTitle: string
    }
}

export default function reducer(state: boardInterface, action: actionInterface) {
    const payload = action.payload
    const draggedTask = payload.draggedTask
    let lists = []
    if (action.type === "addTask") {
        const newTask = payload.newTask
        lists = state.lists
        if (newTask)
            lists.forEach(l => l.title === payload.currentListTitle ? l.tasks = [...l.tasks, newTask] : {})
        if (draggedTask)
            lists.forEach(l => l.title === payload.currentListTitle ? l.tasks = [...l.tasks, draggedTask.task] : {})
        return { ...state, lists }
    }
    if (draggedTask)
        switch (action.type) {
            case "moveTask":
                lists = state.lists
                lists.forEach(l => {
                    if (l.title === payload.currentListTitle) {
                        const dragOverItemIndex = l.tasks.indexOf(draggedTask.dragOverItem.task)
                        if (draggedTask.list === draggedTask.dragOverItem.list) {
                            const currentItemIndex = l.tasks.indexOf(draggedTask.task)
                            l.tasks.splice(currentItemIndex, 1)
                        }
                        l.tasks.splice(dragOverItemIndex, 0, draggedTask.task)
                    }
                })
                return { ...state, lists }
            case "removeTask":
                lists = state.lists
                lists.forEach(l => l.title === payload.currentListTitle ? l.tasks = l.tasks.filter(t => t != draggedTask.task) : {})
                return { ...state, lists }
            default:
                break;
        }
    return state
}