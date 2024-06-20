import { createContext } from "react";

interface draggedTaskContextInterface {
    draggedTask?: string,
    setDraggedTask?: React.Dispatch<React.SetStateAction<string>>
}
const TaskContext = createContext<draggedTaskContextInterface>({})

export default TaskContext