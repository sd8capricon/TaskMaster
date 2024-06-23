import { createContext } from "react";

export interface draggedTaskInterface {
    task: string,
    list: string,
    dragOverItem: {
        task: string,
        list: string
    }
}

interface draggedTaskContextInterface {
    draggedTask?: draggedTaskInterface
    setDraggedTask?: React.Dispatch<React.SetStateAction<draggedTaskInterface>>
}
const TaskContext = createContext<draggedTaskContextInterface>({})

export default TaskContext