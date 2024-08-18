import { createContext } from "react";


interface draggedTaskContextInterface {
    draggedTask?: draggedTask
    setDraggedTask?: React.Dispatch<React.SetStateAction<draggedTask>>
}
const TaskContext = createContext<draggedTaskContextInterface>({})

export default TaskContext